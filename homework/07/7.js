function fakeGet(sql, params, callback) {
  callback(null, { title: "Fake Title" });
}

fakeGet("SELECT * FROM posts", [], (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result.title);
});
