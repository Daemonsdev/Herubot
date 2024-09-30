const fs = require('fs');

module.exports = {
  config: {
    name: "eval",
    description: "Executes the provided JavaScript code",
    usage: "eval <code>",
    cooldown: 5,
    role: 1,
    prefix: false
  },
  run: async (api, event, args, reply, react) => {
    try {
      const code = args.join(" ");

      if (code.includes('process') || code.includes('require')) {
        return reply(global.formatFont("⚠️ Unsafe code detected. Execution halted."), event);
      }

      let result = eval(code);
      result = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;

      reply(global.formatFont(result), event);
    } catch (error) {
      reply(`🔥 Error:\n${error.message}`, event);
    }
  }
};
