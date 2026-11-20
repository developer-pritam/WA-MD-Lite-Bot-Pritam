import chalk from "chalk";
import { proto } from "@adiwajshing/baileys";

async function handleMessagesUpsert({ event, sock, store }) {
    const upsert = event;
    // if (upsert.type !== 'notify') {
    //     console.log(chalk.greenBright.bold('[INFO] Chats update: Message not notify ' + JSON.stringify(upsert, null, 2)));
    //     return;
    // }
    // for (const msg of upsert.messages) {
    //     const chat: proto.IWebMessageInfo = msg;
    //     const userMessage = chat.message!.extendedTextMessage ? chat.message.extendedTextMessage.text : chat.message.conversation;

    //     const messageInstance: BotsApp = resolve(chat, sock);
    //     if (userMessage.startsWith("!score")) {
    //         console.log(chalk.greenBright.bold('[INFO] Chats update: ' + userMessage));
    //         const type = userMessage.split("--").length > 1 ? messageInstance.body.split("--")[1].split(" ")[0] : "upcoming";
    //         const scoreText = await getScore(type);
    //         await sock.sendMessage(chat.key.remoteJid, { text: scoreText }, { quoted: msg });
    //         return;
    //     } else if (!messageInstance.fromMe) {
    //         if (messageInstance.isDeleted && (messageInstance.isGroup && deletedMsgEnabledGroups[messageInstance.chatId] || messageInstance.chatId.includes('@s.whatsapp.net'))) {
    //             console.log(chalk.redBright.bold(`[INFO] Message deleted.`));
    //             console.log(JSON.stringify(messageInstance, null, 2));
    //             // get deleted message from the database
    //             const sender = messageInstance.sender;
    //             const messageId = messageInstance.deletedMessageID;
    //             console.log(chalk.redBright.bold(`[INFO] Deleted message id: ${messageId}`));
    //             const deletedMessage: proto.IWebMessageInfo = await store.loadMessage(messageInstance.chatId, messageId);
    //             if (!deletedMessage) {
    //                 console.log(chalk.redBright.bold(`[INFO] Deleted message not found.`));
    //                 return
    //             }
    //             // forward the deleted message to the admin based on the message type
    //             await sock.sendMessage(messageInstance.chatId, { forward: deletedMessage }, { quoted: deletedMessage, });
    //         }
    //     } else if (!chat.key.fromMe && chat.key.remoteJid.includes("@s.whatsapp.net")) {

    //         if (afk.enabled) {
    //             const time = getTimeDifference(new Date().getTime(), afk.lastseen);
    //             const reactionMessage = {
    //                 react: {
    //                     text: "😴", // use an empty string to remove the reaction
    //                     key: chat.key
    //                 }

    //             }
    //             const sentMsgr = await sock.sendMessage(chat.key.remoteJid, reactionMessage)
    //             try {
    //                 await sock.sendMessage(chat.key.remoteJid, { text: "Pritam is offline right now.\nLast seen: " + time + " ago." }, { quoted: chat })
    //             }
    //             catch (e) {
    //                 console.log(e)
    //             }
    //             return
    //         }

    //     }
    //     else {
    //         const userMessage = chat.message!.extendedTextMessage ? chat.message.extendedTextMessage.text : chat.message.conversation;
    //         if (userMessage == "!afk") {
    //             afk.enabled = !afk.enabled
    //             afk.lastseen = new Date().getTime();
    //             await sock.sendMessage(chat.key.remoteJid, { text: `afk is ${afk.enabled ? "enabled" : "disabled"}` }, { quoted: chat })
    //             return
    //         }
    //         if (userMessage.includes("!del")) {
    //             deletedMsgEnabledGroups[chat.key.remoteJid] = deletedMsgEnabledGroups[chat.key.remoteJid] ? false : true;
    //             await sock.sendMessage(chat.key.remoteJid, { text: `Deleted message logging is ${deletedMsgEnabledGroups[chat.key.remoteJid] ? "enabled" : "disabled"}` }, { quoted: chat })
    //             return
    //         }


    //     }


    // }
}