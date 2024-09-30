const request = require("request");

module.exports = {
    config: {
        name: "trans",
        description: "Text translation",
        usage: "trans [tl, en] [prompt]",
        cooldown: 5,
        role: 0,
        prefix: true
    },
    run: async (api, event, args, reply) => {
        const targetLanguage = args[0];
        const content = args.slice(1).join(" ");

        try {
            if (content.length === 0 && event.type !== "message_reply") {
                return reply(global.formatFont(`Please provide a text to translate or reply to a message.\n\nExample: trans tl what is life`), event);
            }

            let translateThis, lang;

            if (event.type === "message_reply") {
                translateThis = event.messageReply.body;
                lang = targetLanguage || 'tl';
            } else {
                translateThis = content;
                lang = targetLanguage || 'tl';
            }

            request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
                if (err) return reply(global.formatFont("An error has occurred!"), event);

                const retrieve = JSON.parse(body);
                let text = '';
                retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');

                const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];

                reply(global.formatFont(`Translation: ${text}\n - Translated from ${fromLang} to ${lang}`), event);
            });

        } catch (error) {
            reply(global.formatFont(`❎ ${error.message}`), event);
        }
    }
};