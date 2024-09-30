const axios = require('axios');

module.exports = {
    config: {
        name: "llama",
        description: "Talk to LLaMA AI.",
        usage: "llama <your query>",
        cooldown: 5,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply, react) => {
        const query = args.join(" ");
        if (!query) {
            react("⚠️", event);
            return reply(global.formatFont("Please provide a query."), event);
        }

        try {
            react("⏳", event);

            const heru = await new Promise(resolve => {
                api.sendMessage('Searching, please wait...', event.threadID, (err, info) => {
                    resolve(info);
                });
            });

            const apiUrl = `https://deku-rest-api.gleeze.com/api/llama-3-70b?q=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);
            const answer = response.data?.result || "I couldn't fetch a response from LLaMA.";

            const formattedResponse = global.formatFont(`🌟 Llama Ai\n━━━━━━━━━━━━━━━\n${answer}`);

            try {
                await api.editMessage(formattedResponse, heru.messageID);
            } catch (error) {
                console.error('Error:', error);
                api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
            }

            react("✅", event);

        } catch (error) {
            react("⚠️", event);
            return reply(global.formatFont("There was an error fetching data from the LLaMA API. Please try again later."), event);
        }
    }
};
