import chalk from 'chalk'
console.log(chalk.yellowBright('[INFO] Bot Starting...'));
import { Boom } from '@hapi/boom'
import makeWASocket, { makeInMemoryStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, WAMessageKey, WAMessageContent, proto } from '@adiwajshing/baileys';
import P, { Logger } from 'pino';
import { handleConnectionUpdate } from './events';

(async () => {

    const startSock = async () => {

        const logger: Logger = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` }).child({})
        logger.level = 'fatal';
        const store = makeInMemoryStore({ logger })
        store?.readFromFile('./chat-data.json')
        // save every 10s
        setInterval(() => {
            store?.writeToFile('./chat-data.json')
        }, 10_000);

        const { state, saveCreds } = await useMultiFileAuthState('auth')
        // fetch latest version of WA Web
        const { version, isLatest } = await fetchLatestBaileysVersion()
        console.log(chalk.yellowBright(`using WA v${version.join('.')}, isLatest: ${isLatest}`));

        const sock = makeWASocket({
            version,
            logger,
            printQRInTerminal: true,
            browser: ["PritamBotLite", "Chrome", "4.0.0"],
            auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: makeCacheableSignalKeyStore(state.keys, logger),
            },
            generateHighQualityLinkPreview: true,
            // ignore all broadcast messages -- to receive the same
            // comment the line below out
            // shouldIgnoreJid: jid => isJidBroadcast(jid),
            // implement to handle retries & poll updates
            getMessage,
        });
        store?.bind(sock.ev);


        sock.ev.process(
            // events is a map for event name => event data
            async (events) => {

                if (events['connection.update']) {
                    const update = events['connection.update'];
                    await handleConnectionUpdate(update, startSock);
                }
                if (events['creds.update']) {
                    await saveCreds()
                }



            })


        async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid!, key.id!)
                return msg?.message || undefined
            }
            // only if store is present
            return proto.Message.fromObject({})
        }
        return sock;
    }
    startSock();
})().catch((e) => {
    console.log(chalk.redBright('[ERROR] Bot Crashed!' + e.message));
    console.log(e);
})

console.log(chalk.yellowBright('[INFO] Loading Config...'));