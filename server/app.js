const path = require('path');
const express = require('express');
const router = require('./router.js');
const expressHandlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use('/assets', express.static('media/'));

app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));

app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${port}`);
  });

router(app);