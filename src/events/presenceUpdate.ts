import chalk from "chalk";
import lastTyping from "./../../lastTyping.json";


const muskanId = '918882612206@s.whatsapp.net'
const hackID = '120363047042799281@g.us'
const tandelBazz = "120363029101329733@g.us"
const myID = "917531813068@s.whatsapp.net"


const handlePresenceUpdate = async ({ event, store, sock }) => {
    console.log(chalk.yellowBright("[INFO] Presence Update"));
    const { id, presences } = event;
    const isGroup = id.endsWith('@g.us');
    if (isGroup && (id === hackID || id === tandelBazz)) {
        const sender = Object.keys(presences)[0];
        const { lastKnownPresence } = presences[sender];
        // const name = users[sender.replace('@s.whatsapp.net', '')];
        const number = sender.split('@')[0];
        const lastReply = lastTyping.group[sender] ? lastTyping.group[sender] : new Date().getTime();
        const currTime = new Date().getTime();
        // if currtime and lastreply is greater than 1.5 hour
        if (currTime - lastReply > 1.5 * 60 * 60 * 1000) {
            lastTyping.group[sender] = new Date().getTime();
            const messages = [
                "Whats up @" + number + "?",
                `Kya chal raha hai @${number}?`,
                `Welcome back @${number}!`,
                `Hello @${number}!`,
                `Aagye Apni maut ka Tamsha dekhne, @${number}`,
            ]
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            if (lastKnownPresence) {
                await sock.sendMessage(id, { text: randomMessage, mentions: [sender] });
            }
        } else if (lastKnownPresence == "composing") {
            lastTyping.group[sender] = new Date().getTime();

            console.log(chalk.greenBright.bold('[INFO] Last reply was less than 1 hour ago'));
        }
    } else if (!isGroup) {

        const sender = Object.keys(presences)[0];
        const { lastKnownPresence } = presences[sender];
        // const name = users[sender.replace('@s.whatsapp.net', '')];
        const lastReply = lastTyping[sender] ? lastTyping[sender] : new Date().getTime();
        const currTime = new Date().getTime();

        if (currTime - lastReply > 2 * 60 * 60 * 1000) {
            // Some conversation starters messages list
            const messages = [
                "Whats up?",
                `Kya chal raha hai?`,
                `Hi!`,
                `Hello!`,
                "Yo",
                "Hey",
                // `Aagye Apni maut ka Tamsha dekhne, ${name}`,
            ]

            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            if (lastKnownPresence == "composing") {
                lastTyping[sender] = new Date().getTime();

                await sock.sendMessage(id, { text: randomMessage });
            }
        } else if (lastKnownPresence == "composing") {
            console.log(chalk.greenBright.bold('[INFO] Last reply was less than 1 hour ago'));
            lastTyping[sender] = new Date().getTime();
        }
    }
};
export default handlePresenceUpdate;