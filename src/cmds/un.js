module.exports = {
  config: {
    name: "un",
    description: "Unsent bot message",
    usage: "un <bot message>",
    cooldown: 5,
    prefix: false,
    role: 0,
  },
  run: async (api, event, args, reply, react) => {
    if (event.messageReply.senderID != api.getCurrentUserID()) 
      return reply("I can't unsend from other messages.");
    if (event.type != "message_reply") 
      return reply("Reply to a bot message.");
    return api.unsendMessage(event.messageReply.messageID, (err) => 
      err ? reply("Something went wrong.") : ""
    );
  },
};