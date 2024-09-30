const fs = require("fs");
const axios = require("axios");
const request = require("request");

module.exports = {
  config: {
    name: "shoti",
    description: "Generate a random shoti TikTok video",
    usage: "",
    prefix: true,
    role: 0,
    cooldown: 0,
  },
  run: async (api, event, args, reply, react) => {
    react("⏳", event);
    api.sendTypingIndicator(event.threadID, true);

    const { messageID, threadID } = event;

    if (!args.length) {
      reply("Downloading...", event);
    }

    try {
      const response = await axios.get(`https://shoti.kenliejugarap.com/getvideo.php?apikey=shoti-5130636c6ea2de288ed40202afd3742eb93197280ca9f57ab36de6d5d1aede2030259b9ffe487103ebeec64556a507d66f2d5262e224a8d96c03fe14c678d65167eee51a085aff8b58e6d516e05f660303a169ac9b`);

      if (response.data.status) {
        const { title, tiktokUrl, videoDownloadLink } = response.data;
        const path = __dirname + `/cache/shoti.mp4`;
        const file = fs.createWriteStream(path);
        const rqs = request(encodeURI(videoDownloadLink));
        rqs.pipe(file);

        file.on('finish', () => {
          setTimeout(() => {
            react("✅", event);
            return api.sendMessage({
              body: `𝖧𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗌𝗁𝗈𝗍𝗂 𝗏𝗂𝖽𝖾𝗈 📸.\n\n𝖳𝗂𝗍𝗅𝖾: \n${title}\n𝖳𝗂𝗄𝗍𝗈𝗄 𝖴𝖱𝖫: \n${tiktokUrl}`,
              attachment: fs.createReadStream(path)
            }, threadID);
          }, 1000);
        });

        file.on('error', (err) => {
          reply(`Error: ${err}`, event);
        });
      } else {
        reply(`Failed to fetch video.`, event);
      }
    } catch (err) {
      reply(`Error: ${err}`, event);
    }
  },
};