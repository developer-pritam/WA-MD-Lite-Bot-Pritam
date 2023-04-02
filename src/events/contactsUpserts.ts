import { Contact } from "@adiwajshing/baileys";

const handleContactsUpdate = ({ event, store }) => {
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