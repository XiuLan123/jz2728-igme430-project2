const path = require('path');
const express = require('express');
const router = require('./router.js');

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use('/assets', express.static('media/'));

app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${port}`);
  });

router(app);