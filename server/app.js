const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const router = require('./router.js');

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3001;

app.use('/assets', express.static('media/'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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
