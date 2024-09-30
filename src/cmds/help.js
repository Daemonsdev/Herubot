const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    description: "Displays available commands",
    usage: "help",
    cooldown: 5,
    role: 0,
    prefix: true
  },
  run: async (api, event, args, reply) => {
    const commandPath = path.join(__dirname);
    const files = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));
    
    const commandsPerPage = 5;
    const totalPages = Math.ceil(files.length / commandsPerPage);

    let helpMessage = `Available Commands:\n╭─╼━━━━━━━━╾─╮\n`;

    if (args[0] && args[0].toLowerCase() === 'all') {
      files.forEach(file => {
        const cmd = require(path.join(commandPath, file));
        helpMessage += `│ ✦ ${cmd.config.name}\n`;
      });
      helpMessage += `╰─━━━━━━━━━╾─╯\n`;
      helpMessage += `❐ Prefix: » ${global.heru.prefix} «\n`;
      helpMessage += `❐ Type » ${global.heru.prefix}help <command> « to get more information about a specific command.\n`;
      helpMessage += `❐ Total commands:【 ${files.length} 】\n`;
      helpMessage += `━━━━━━━━━━━━━━━━`;
    } else if (args[0] && !isNaN(args[0])) {
      let page = parseInt(args[0]) || 1;
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      const startIndex = (page - 1) * commandsPerPage;
      const endIndex = startIndex + commandsPerPage;

      files.slice(startIndex, endIndex).forEach(file => {
        const cmd = require(path.join(commandPath, file));
        helpMessage += `│ ✦ ${cmd.config.name}\n`;
      });

      helpMessage += `╰─━━━━━━━━━╾─╯\n`;
      helpMessage += `❐ Page:【 ${page}/${totalPages} 】\n`;
      helpMessage += `❐ Prefix: » ${global.heru.prefix} «\n`;
      helpMessage += `❐ Total commands:【 ${files.length} 】\n`;
      helpMessage += `❐ Type » ${global.heru.prefix}help all « to see all available commands.\n`;
      helpMessage += `━━━━━━━━━━━━━━━━`;
    } else if (args[0]) {
      const command = files.find(file => file.includes(args[0].toLowerCase() + '.js'));
      if (command) {
        const cmd = require(path.join(commandPath, command));
        helpMessage = `✦ 𝗚𝘂𝗶𝗱𝗲 𝗟𝗶𝘀𝘁\n`;
        helpMessage += `╭─╼━━━━━━━━╾─╮\n`;
        helpMessage += `◉ Commandname: ${cmd.config.name}\n`;
        helpMessage += `◉ Description: ${cmd.config.description}\n`;
        helpMessage += `◉ Usage: ${cmd.config.usage || 'No usage example available'}\n`;
        helpMessage += `◉ Cooldown: ${cmd.config.cooldown || 0} seconds\n`;
        helpMessage += `◉ Role: ${cmd.config.role || 0}\n`;
        helpMessage += `◉ Prefix: ${cmd.config.prefix ? global.heru.prefix : 'None'}\n`;
        helpMessage += `╰─━━━━━━━━━╾─╯\n`;
      } else {
        helpMessage = `❏ Command not found. Use "${global.heru.prefix}help all" to see all available commands.`;
      }
    } else {
      files.slice(0, commandsPerPage).forEach(file => {
        const cmd = require(path.join(commandPath, file));
        helpMessage += `│ ✦ ${cmd.config.name}\n`;
      });
      helpMessage += `╰─━━━━━━━━━╾─╯\n`;
      helpMessage += `❐ Page: 【 1/${totalPages} 】\n`;
      helpMessage += `❐ Prefix: » ${global.heru.prefix} «\n`;
      helpMessage += `❐ Total commands: 【 ${files.length} 】\n`;
      helpMessage += `❐ Type » ${global.heru.prefix}help all « to see all available commands.\n`;
      helpMessage += `━━━━━━━━━━━━━━━━`;
    }

    reply(helpMessage, event);
  },
};
