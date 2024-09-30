module.exports = {
  config: {
    name: "out",
    description: "Removes the bot from the current group.",
    usage: "out",
    cooldown: 0,
    role: 1,
    prefix: false
  },
  run: async (api, event, args, reply) => {
    try {
      await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      reply("🥺 Byeee!!!", event);
    } catch (error) {
      reply(`❗ An error occurred: ${error.message}`, event);
    }
  }
};