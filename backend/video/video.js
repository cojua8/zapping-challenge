import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createPlaylistFile, moveToFinalSegments } from "./playlist.js";

const videoRouter = express.Router();
export default videoRouter;

videoRouter.get("/video.m3u8", (req, res) => {
    console.log("Serving playlist file");
    const file = createPlaylistFile();
    console.log(file.toString());

    res.header("Content-Type", "application/vnd.apple.mpegurl");
    res.send(file);
});

videoRouter.get("/:resource", (req, res) => {
    console.log("Serving file", req.params.resource);
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    res.sendFile(path.join(dirname, "videos", req.params.resource));
});

videoRouter.post("/end", (req, res) => {
    console.log("Moving to end of video");
    moveToFinalSegments();
    res.sendStatus(200);
});
