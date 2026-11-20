
import { adminCapture } from "../modules";

const handleGroupParticipantsUpdate = async ({ sock, event }) => {


    const { id, participants, action } = event;
    adminCapture({ event, sock });


}
export default handleGroupParticipantsUpdate;