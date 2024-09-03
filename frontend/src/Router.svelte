<script>
    import { Route, Router } from "svelte-routing";
    import Login from "./pages/Login.svelte";
    import Player from "./pages/Player.svelte";
    import Signup from "./pages/Signup.svelte";
</script>

<Router>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/player" component={Player} />
</Router>