const axios = require('axios');

module.exports = {
  config: {
    name: "modelai",
    description: "Ask a question using a specific AI model.",
    usage: "modelai [model_number] [question]",
    cooldown: 5,
    role: 0,
    prefix: false
  },
  run: async (api, event, args, reply, react) => {
    const models = [
      "llama-3.1-70b-instruct",
      "llama-3.1-8b-instruct",
      "llama-3.1-sonar-large-128k-chat",
      "llama-3.1-sonar-small-128k-online",
      "llama-3.1-sonar-large-128k-online",
      "gemini",
      "GPT-4o",
      "GPT-3.5",
      "duckduckgo-search",
      "google-search",
      "llama-3.1-sonar-small-128k-chat"
    ];

    const modelIndex = parseInt(args[0], 10) - 1; 
    const question = args.slice(1).join(' ');

    if (isNaN(modelIndex) || modelIndex < 0 || modelIndex >= models.length || !question) {
      react("⚠️", event);
      return reply(global.formatFont(
        `Usage: modelai [model_number] [question]\nAvailable models:\n━━━━━━━━━━━━━━━\n${models.map((model, i) => `${i + 1}. ${model}`).join('\n')}`
      ), event);
    }

    const selectedModel = models[modelIndex];

    try {
      react("⏳", event);

      const heru = await new Promise(resolve => {
        api.sendMessage('Processing your request, please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const apiUrl = `https://hiroshi-api.onrender.com/ai/xyz?ask=${encodeURIComponent(question)}&model=${encodeURIComponent(selectedModel)}`;
      const response = await axios.get(apiUrl);

      const answer = response.data?.response || "I couldn't fetch a response.";
      
      const formattedResponse = global.formatFont(
        `⚙️ 𝗠𝗢𝗗𝗘𝗟𝗔𝗜 (${selectedModel})\n━━━━━━━━━━━━━━━\n${answer}`
      );

      try {
        await api.editMessage(formattedResponse, heru.messageID);
      } catch (error) {
        console.error('Error:', error);
        api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
      }

      react("✅", event);

    } catch (error) {
      react("⚠️", event);
      reply(global.formatFont(`❌ ${error.message}`), event);
    }
  }
};
