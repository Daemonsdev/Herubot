const axios = require('axios');

module.exports = {
    config: {
        name: "boxai",
        description: "Interact with Blackbox AI",
        usage: "blackbox [question]",
        cooldown: 3,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply, react) => {
        const prompt = args.join(' ');

        if (!prompt) {
            react("⚠️", event);
            return reply(global.formatFont("Please provide a question."), event);
        }

        react("⏳", event);

        try {
            const heru = await new Promise(resolve => {
                api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
                    resolve(info);
                });
            });

            const response = await axios.get("https://deku-rest-api.gleeze.com/blackbox", {
                params: { prompt: prompt },
            });

            const result = response.data;
            const responseString = result?.data || global.formatFont("No result found.");

            const formattedResponse = `
📦 | BLACKBOX AI
━━━━━━━━━━━━━━━━━━
${responseString}
━━━━━━━━━━━━━━━━━━
◉ 𝙷𝚎𝚛𝚞 𝙱𝚘𝚝
            `;

            try {
                await api.editMessage(global.formatFont(formattedResponse.trim()), heru.messageID);
            } catch (error) {
                console.error('Error:', error);
                api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
            }

            react("✅", event);
        } catch (error) {
            react("⚠️", event);
            reply(global.formatFont("❌ Error fetching response."), event);
        }
    }
};
