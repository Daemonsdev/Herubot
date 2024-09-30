module.exports = {
  config: {
    name: "hi",
    description: "Sends a greeting message",
    prefix: false,
    role: 0,
  },
  run: async (api, event, args, reply, react) => {
    react("👋", event);
    reply("Hello! How can I assist you today?", event);
  },
};
