const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "autopost",
    description: "Automatically posts a random dog image immediately and then every hour.",
    cooldowns: 5,
    role: 1,
    prefix: false
  },
  run: async (api, event, args, reply, react) => {
    const { threadID } = event;
    let isActive = false;

    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const downloadImage = async (url) => {
      const imagePath = path.join(__dirname, 'tempImage.jpg');
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'stream',
      });

      return new Promise((resolve, reject) => {
        const stream = response.data.pipe(fs.createWriteStream(imagePath));
        stream.on('finish', () => resolve(imagePath));
        stream.on('error', (err) => reject(err));
      });
    };

    const postImage = async () => {
      try {
        let imageUrl;
        let attempts = 0;

        do {
          const response = await axios.get("https://nash-rest-api-production.up.railway.app/random-dog-image");
          imageUrl = response.data.url;
          attempts++;
        } while (!validImageExtensions.some(ext => imageUrl.endsWith(ext)) && attempts < 5);

        if (!validImageExtensions.some(ext => imageUrl.endsWith(ext))) {
          throw new Error('No valid image found after several attempts.');
        }

        const imagePath = await downloadImage(imageUrl);

        await api.createPost({
          attachment: fs.createReadStream(imagePath),
          visibility: "Everyone",
        });

        fs.unlinkSync(imagePath);
      } catch (error) {
        // Handle the error (optional)
      }
    };

    const startAutoPost = () => {
      isActive = true;
      postImage();
      setInterval(() => {
        if (isActive) {
          postImage();
        }
      }, 5000); // 1 hour
      reply("┌─[ AUTOPOST ]─────[ # ]\n└───► Auto-post is now active!", event);
    };

    const stopAutoPost = () => {
      isActive = false;
      reply("┌─[ AUTOPOST ]─────[ # ]\n└───► Auto-post has been stopped!", event);
    };

    if (event.body.toLowerCase() === 'autopost on') {
      startAutoPost();
    } else if (event.body.toLowerCase() === 'autopost off') {
      stopAutoPost();
    }
  },
};