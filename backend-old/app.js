import cors from "cors";
import express from "express";
import usersRouter from "./users/users.js";
import videoRouter from "./video/video.js";

const app = express();
app.use(cors());

app.use("/video", videoRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Zapping HLS app listening on port ${PORT}`);
});
