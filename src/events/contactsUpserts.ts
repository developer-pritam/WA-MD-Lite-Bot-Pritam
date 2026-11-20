import { Contact } from "@adiwajshing/baileys";
import chalk from "chalk";

const handleContactsUpdate = ({ event, store }) => {
    console.log(chalk.yellowBright("[INFO] Contacts Update"));

    const newContacts: Contact[] = event;
    for (const contact of newContacts) {
        if (store.contacts[contact.id]) {
            Object.assign(store.contacts[contact.id], contact);
        } else {
            store.contacts[contact.id] = contact;
        }
    }
    return;
};

export default handleContactsUpdate;