const axios = require('axios');

module.exports = {
    config: {
        name: "uid",
        description: "Get the user's Facebook UID.",
        usage: "uid [@mention]",
        cooldown: 5,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply, react) => {
        try {
            if (Object.keys(event.mentions).length === 0) {
                if (event.messageReply) {
                    const senderID = event.messageReply.senderID;
                    return reply(senderID, event);
                } else {
                    return reply(`${event.senderID}`, event);
                }
            } else {
                for (const mentionID in event.mentions) {
                    const mentionName = event.mentions[mentionID];
                    reply(`${mentionName.replace('@', '')}: ${mentionID}`, event);
                }
            }
        } catch (error) {
            react("⚠️", event);
            reply(`❌ Error: ${error.message}`, event);
        }
    }
};
