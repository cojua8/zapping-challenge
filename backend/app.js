const express = require("express");
const cors = require("cors");
const videoRouter = require("./video");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send({ result: "Hello World!" });
});

app.use("/video", videoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Zapping HLS app listening on port ${PORT}`);
});
