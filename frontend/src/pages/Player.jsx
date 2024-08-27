import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import { useUser } from "../contexts/userContext";
const Player = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <PrivateNavbar />
      <div className="p-3 m-0 border-0 m-0 border-0">
        <h1 id="welcome-title">Bienvenido, {user.name}</h1>
        <video id="video" controls className="w-100"></video>
        <button id="end-video-button" className="btn btn-primary">
          Ir a final de stream
        </button>
      </div>
    </div>
  );
};

export default Player;
