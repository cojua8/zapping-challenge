import LoginForm from "../components/LoginForm";
import PublicNavbar from "../components/PublicNavbar";

const Login = () => {
  return (
    <div>
      <PublicNavbar />
      <div className="p-3 m-0 border-0 m-0 border-0">
        <div className="d-lg-flex justify-content-between gap-5">
          <div className="w-100 w-lg-50">
            <h1>Bienvenido</h1>
            <div className="text-justify">
              "Big Buck Bunny" (nombre código Peach) es un corto animado del
              Instituto Blender, parte de la Fundación Blender. Como la previa
              película de la fundación, "Elephants Dream", esta película se
              realizó usando software libre. El trabajo comenzó en octubre de
              2007 y la película fue lanzada el 10 de abril de 2008 en
              Ámsterdam. La película fue financiada por la fundación Blender. La
              historia trata sobre la venganza de un enorme conejo bonachón, y
              con sobrepeso, al que sus vecinos de bosque le tocan tanto la
              moral que no tiene más remedio que reaccionar. (Fuente: Wikipedia)
              (FILMAFFINITY)
            </div>
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
