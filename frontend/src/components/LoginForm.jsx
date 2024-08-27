import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import service from "../services/users";

const LoginForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await service.loginUser(data);
      setUser(response.data);
      navigate("/player");
    } catch (error) {
      console.error(error);
    }
  };

  const fillForm = () => {
    methods.setValue("email", "john@doe.com");
    methods.setValue("password", "password");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="my@email.com"
            required
            {...methods.register("email")}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="******"
            required
            {...methods.register("password")}
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div className="d-flex gap-3 flex-wrap">
            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={fillForm}
              className="btn btn-outline-success btn-block"
            >
              Llenar formulario
            </button>
          </div>
          <p>
            ¿No eres miembro? <Link to="/signup">Regístrate</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
