const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "prefix",
        description: "Shows the current prefix, and current date and time.",
        usage: "prefix",
        cooldown: 5,
        role: 0,
        prefix: false
    },
    run: async (api, event, args, reply) => {
        try {
            const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
            const currentTime = moment().tz('Asia/Manila').format('HH:mm:ss');
            const response = global.formatFont(`⚙️ My prefix is: 》 ${global.heru.prefix} 《\n📅 Date: ${currentDate}\n⏰ Time: ${currentTime}`);

            reply(response, event);

        } catch (err) {
            console.error('Error sending prefix response:', err);
            reply(global.formatFont("An error occurred while processing your request."), event);
        }
    },
};
