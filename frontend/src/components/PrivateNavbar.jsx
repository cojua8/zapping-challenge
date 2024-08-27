import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
const PrivateNavbar = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setUser(undefined);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand" to="/player">
            Zapping HLS
          </Link>
        </div>

        <button
          onClick={logout}
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
