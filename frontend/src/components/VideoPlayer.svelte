<script>
  import Hls from "hls.js";

  import { onMount } from "svelte";

  let video;
  onMount(() => {
    const hls = new Hls();
    hls.loadSource(`${import.meta.env.VITE_BACKEND_URL}/video/video.m3u8`);
    hls.attachMedia(video);
  });
</script>

<div>
  <video id="video" class="w-100" autoplay controls bind:this={video}>
    <track kind="captions" />
  </video>
</div>
