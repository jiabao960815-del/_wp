const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'blog.db');
let db;
let initialized = false;

function save() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

const api = {
  prepare(stmt) {
    return {
      all: (...params) => {
        const s = db.prepare(stmt);
        if (params.length > 0) s.bind(params);
        const results = [];
        while (s.step()) results.push(s.getAsObject());
        s.free();
        return results;
      },
      get: (...params) => {
        const s = db.prepare(stmt);
        if (params.length > 0) s.bind(params);
        const result = s.step() ? s.getAsObject() : undefined;
        s.free();
        return result;
      },
      run: (...params) => {
        const s = db.prepare(stmt);
        if (params.length > 0) s.bind(params);
        s.step();
        s.free();
        save();
      }
    };
  }
};

async function init() {
  if (initialized) return;
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  save();
  initialized = true;
}

module.exports = { init, ...api };
