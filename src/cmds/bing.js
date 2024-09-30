const axios = require('axios');

module.exports = {
    config: {
        name: "bing",
        description: "Interact with Bing search",
        usage: "bing [mode] [query]\nModes: 1 (Creative), 2 (Balanced), 3 (Precise)",
        cooldown: 3,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply, react) => {
        const modeMap = {
            '1': 'Creative',
            '2': 'Balanced',
            '3': 'Precise'
        };

        const mode = args[0];
        const query = args.slice(1).join(' ');

        if (!modeMap[mode] || !query) {
            react("⚠️", event);
            return reply(global.formatFont("🌟 𝗕𝗜𝗡𝗚 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\nPlease provide a valid mode:\nAvailable Model:\n1 (Creative)\n2 (Balanced)\n3 (Precise)\n\nExample: bing 1 hello."), event);
        }

        react("⏳", event);

        try {
            const heru = await new Promise(resolve => {
                api.sendMessage('Searching Please wait...', event.threadID, (err, info) => {
                    resolve(info);
                });
            });

            const response = await axios.get("https://deku-rest-api.gleeze.com/bing", {
                params: {
                    prompt: query,
                    mode: modeMap[mode]
                },
            });

            const result = response.data.bing;
            const responseString = result || global.formatFont("No results found.");

            const formattedResponse = `🌟 𝗕𝗜𝗡𝗚 𝗔𝗜 (${modeMap[mode]})
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
            reply(global.formatFont("❌ Error fetching results from Bing."), event);
        }
    }
};
