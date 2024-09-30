const express = require('express');
const app = express();
const port = process.env.PORT || 25641;
const path = require('path');
app.use(express.static(path.join(process.cwd(), 'utils')));
app.get('/', async function (_, res) {
 res.send(path.join(process.cwd(), 'utils', 'index.html'))
})
app.listen(port, () => {
  console.log('Bot is running on port ' + port)
})
