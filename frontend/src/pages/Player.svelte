<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import PrivateNavbar from "../components/PrivateNavbar.svelte";
  import VideoPlayer from "../components/VideoPlayer.svelte";
  import service from "../services/video";
  import { user } from "../stores/user";

  onMount(() => {
    if (!$user) {
      navigate("/");
    }
  });

  const moveVideo = async (location) => {
    await service.setVideoTo(location);
    window.location.reload();
  };
</script>

{#if !$user}
  <div>User is not logged in</div>
{:else}
  <div>
    <PrivateNavbar />
    <div class="p-3 m-0 border-0 m-0 border-0">
      <h1>Bienvenido, {$user.name}</h1>
      <div class="w-100 mb-2">
        <VideoPlayer />
      </div>
      <p>
        Estos botones sirven para manipular el stream. De todas maneras siempre
        mantiene la condición de "en vivo"
      </p>
      <div class="d-flex flex-wrap gap-2">
        <button on:click={() => moveVideo("start")} class="btn btn-primary">
          Reiniciar stream
        </button>
        <button on:click={() => moveVideo("end")} class="btn btn-primary">
          Mover a escena post créditos
        </button>
      </div>
    </div>
  </div>
{/if}
