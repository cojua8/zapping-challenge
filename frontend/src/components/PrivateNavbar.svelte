<script>
  import { Link, navigate } from "svelte-routing";
  import { user } from "../stores/user";

  const logout = () => {
    user.set(undefined);
    navigate("/");
  };
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
  <div class="container-fluid">
    <div>
      <Link class="navbar-brand" to="/player">Zapping HLS</Link>
    </div>
    <button
      on:click={logout}
      class="btn btn-outline-success me-2"
      type="button"
    >
      Cerrar sesión
    </button>
  </div>
</nav>
