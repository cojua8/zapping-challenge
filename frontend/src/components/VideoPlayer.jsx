import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const videoUrl = `${import.meta.env.VITE_BACKEND_URL}/video/video.m3u8`;

const VideoPlayer = ({ className }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: videoUrl,
            type: "application/x-mpegURL",
          },
        ],
      };

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on("waiting", () => {
          videojs.log("player is waiting");
        });

        player.on("dispose", () => {
          videojs.log("player will dispose");
        });
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(true);
      player.src(videoUrl);
    }
  }, [videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={className}>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </div>
  );
};

export default VideoPlayer;
