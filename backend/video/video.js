import express from "express";
import path from "path";
import {
    createPlaylistFile,
    moveToFinalSegment,
    moveToStartingSegment,
} from "./playlist.js";

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
    res.sendFile(path.join(process.env.VIDEOS_PATH, req.params.resource));
});

videoRouter.post("/move", (req, res) => {
    if (req.query.to === "end") {
        console.log("Moving to end of video");
        moveToFinalSegment();
    } else if (req.query.to === "start") {
        console.log("Moving to start of video");
        moveToStartingSegment();
    } else {
        console.error(
            "Invalid move query parameter",
            JSON.stringify(req.query)
        );
    }
    res.sendStatus(200);
});
