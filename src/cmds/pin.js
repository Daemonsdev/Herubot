const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pin",
    description: "Image search",
    usage: "pin <prompt>",
    cooldown: 0,
    role: 0,
    prefix: false
  },
  run: async (api, event, args, reply, react) => {
    react("🔍", event);

    const keySearch = args.join(" ");
    if (!keySearch.includes("-")) {
      return reply(
        'Missing prompt!\n\nExample: pin gon - 5',
        event
      );
    }

    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
    const numberSearch = keySearch.split("-").pop() || 6;
    const res = await axios.get(`https://api.kenliejugarap.com/pinterestbymarjhun/?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data && res.data.data;

    let num = 0;
    let imgData = [];

    for (let i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${++num}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(path));
    }

    const count = data.length;

    api.sendMessage(
      {
        attachment: imgData,
        body: `${numberSearch} 𝙾𝚄𝚃 𝙾𝙵 ${count} 𝙿𝙸𝙲𝚂 𝙵𝙸𝙽𝙳𝙴𝙳\n✿━━━━━━━━━━✿\n𝚁𝙴𝚂𝚄𝙻𝚃𝚂 𝙾𝙵: ${keySearchs}`,
      },
      event.threadID,
      event.messageID
    );

    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
      fs.unlinkSync(__dirname + `/cache/${ii}.jpg`);
    }

    react("✅", event);
  },
};