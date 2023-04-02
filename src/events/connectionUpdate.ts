import { DisconnectReason, } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom'

import chalk = require('chalk');
async function handleConnectionUpdate({ event, startSock }) {

    const { connection, lastDisconnect } = event;
    if (connection === 'close') {
        if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
            startSock()
        } else {
            console.log(chalk.redBright('Connection closed. You are logged out. Delete the BotsApp.db and session.data.json files to rescan the code.'));
            process.exit(0);
        }
    } else if (connection === 'connecting') {
        console.log(chalk.yellowBright("[INFO] Connecting to WhatsApp..."));
    } else if (connection === 'open') {
        console.log(chalk.greenBright.bold("[INFO] Connected! Welcome to BotsApp"));

    }
}

export default handleConnectionUpdate;