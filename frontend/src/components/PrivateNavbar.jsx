const PrivateNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
      <div className="container-fluid">
        <div>
          <a className="navbar-brand" href="index.html">
            Zapping HLS
          </a>
        </div>

        <button
          id="logout-button"
          className="btn btn-outline-success me-2"
          type="button"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
