const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5500" }));

app.get("/", (req, res) => {
  res.send({ result: "Hello World!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Zapping HLS app listening on port ${port}`);
});
