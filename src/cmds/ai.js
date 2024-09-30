const axios = require('axios');

module.exports = {
    config: {
        name: "ai",
        description: "Interact with AI",
        usage: "ai [question]",
        cooldown: 3,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply, react) => {
        const query = args.join(' ');

        if (!query) {
            react("⚠️", event);
            return reply(global.formatFont("Please provide a query."), event);
        }

        react("⏳", event);

        try {
            const heru = await new Promise(resolve => {
                api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
                    resolve(info);
                });
            });

            const response = await axios.get("https://tools.betabotz.eu.org/tools/openai", {
                params: { q: query },
            });

            const result = response.data.result;
            const responseString = result || global.formatFont("No result found.");

            const formattedResponse = `
🤖 | ChatGpt-4o 
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
