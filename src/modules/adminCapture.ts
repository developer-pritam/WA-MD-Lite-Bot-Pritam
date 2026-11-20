import chalk from "chalk";
import CONST from "../data/STRINGS.json";

async function adminCapture({ event, sock }) {
    const { id, participants, action } = event;
    const myID = CONST.myID;
    if (participants[0] === myID) {
        if (action === "promote") {
            console.log(chalk.redBright.bold(`[INFO] Promoted to admin.`));
            const groupMetadata = await sock.groupMetadata(id);
            console.log(JSON.stringify(groupMetadata, null, 2))
            const groupAdmins = groupMetadata.participants.filter((participant) => participant.admin === "admin");
            const groupSuperAdmins = groupMetadata.participants.filter((participant) => participant.admin === "superadmin");
            // demote all admins other than the bot and super admins
            const nonSuperAdminsID = groupAdmins.filter((admin) => admin.id !== myID).map((admin) => admin.id);

            if (nonSuperAdminsID.length > 0) {
                await sock.groupParticipantsUpdate(
                    id,
                    nonSuperAdminsID,
                    "demote"
                )
            }
            if (groupSuperAdmins.length === 0 || (groupSuperAdmins.length === 1 && groupSuperAdmins[0].id == myID)) {
                await sock.sendMessage(id, { text: "Hah haah haaah!, Now i am the king of this group!" });
            }
        }
    }

}

export default adminCapture;