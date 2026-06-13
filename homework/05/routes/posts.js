const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.render('index', { posts });
});

router.get('/new', (req, res) => {
  res.render('create');
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.redirect('/posts/new');
  }
  db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)').run(title, content);
  res.redirect('/');
});

router.get('/:id', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post) return res.status(404).send('文章不存在');
  res.render('show', { post });
});

router.get('/:id/edit', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post) return res.status(404).send('文章不存在');
  res.render('edit', { post });
});

router.post('/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.redirect(`/posts/${req.params.id}/edit`);
  }
  db.prepare(
    'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(title, content, req.params.id);
  res.redirect(`/posts/${req.params.id}`);
});

router.post('/:id/delete', (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.redirect('/');
});

module.exports = router;
