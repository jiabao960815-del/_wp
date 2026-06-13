function fetchData(id, callback) {
  const result = { id: id, status: "success" };
  callback(null, result);
}

fetchData(42, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
