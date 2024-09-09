<script>
  import { Link } from "svelte-routing";

  export let to = "";

  const getProps = ({ location, href, isPartiallyCurrent, isCurrent }) => {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    return { class: isActive ? "nav-link active" : "nav-link" };
  };
</script>

<Link {to} {getProps}>
  <slot />
</Link>
