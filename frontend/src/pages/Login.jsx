import LoginForm from "../components/LoginForm";
import PublicNavbar from "../components/PublicNavbar";

const Login = () => {
  return (
    <div>
      <PublicNavbar />
      <div className="p-3 m-0 border-0 m-0 border-0">
        <div className="d-lg-flex justify-content-between">
          <div className="w-100 w-lg-50">
            <h1>Bienvenido</h1>
            <div>Aqui encontrarás tu pelicula favorita</div>
          </div>
          <div className="w-100 w-lg-50">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
