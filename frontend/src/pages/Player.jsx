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

  const endVideo = async () => {
    await service.setVideoToEnd();
  };

  return (
    <div>
      <PrivateNavbar />
      <div className="p-3 m-0 border-0 m-0 border-0">
        <h1>Bienvenido, {user.name}</h1>
        <VideoPlayer className="w-100" />
        <button onClick={endVideo} className="btn btn-primary">
          Ir a final de stream
        </button>
      </div>
    </div>
  );
};

export default Player;
