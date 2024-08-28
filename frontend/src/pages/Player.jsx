import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import VideoPlayer from "../components/VideoPlayer";
import { useUser } from "../contexts/userContext";
import service from "../services/video";

const Player = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const moveVideo = async (location) => {
    await service.setVideoTo(location);
    navigate(0);
  };

  if (!user) {
    return <div></div>;
  } else {
    return (
      <div>
        <PrivateNavbar />
        <div className="p-3 m-0 border-0 m-0 border-0">
          <h1>Bienvenido, {user.name}</h1>
          <div className="w-100 mb-2">
            <VideoPlayer />
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => moveVideo("start")}
              className="btn btn-primary"
            >
              Reiniciar stream
            </button>
            <button
              onClick={() => moveVideo("end")}
              className="btn btn-primary"
            >
              Ir al final del stream
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Player;
