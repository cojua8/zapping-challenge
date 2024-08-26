import PrivateNavbar from "../components/PrivateNavbar";

const Player = () => (
  <div>
    <PrivateNavbar />
    <div className="p-3 m-0 border-0 m-0 border-0">
      <h1 id="welcome-title">Bienvenido</h1>
      <video id="video" controls className="w-100"></video>
      <button id="end-video-button" className="btn btn-primary">
        Ir a final de stream
      </button>
    </div>
  </div>
);

export default Player;
