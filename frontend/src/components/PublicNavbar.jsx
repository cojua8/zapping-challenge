import { NavLink } from "react-router-dom";
const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
      <div className="container-fluid">
        <div>
          <a className="navbar-brand" href="#">
            Zapping HLS
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Regístrate
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
