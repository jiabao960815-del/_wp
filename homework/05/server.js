const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const postsRouter = require('./routes/posts');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.use('/posts', postsRouter);

db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`伺服器啟動於 http://localhost:${PORT}`);
  });
});
