<script>
  import { Link } from "svelte-routing";
  import NavLink from "./NavLink.svelte";
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
  <div class="container-fluid">
    <div>
      <Link class="navbar-brand" to="/">Zapping HLS</Link>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/signup">Regístrate</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
