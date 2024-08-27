import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../contexts/userContext";
import service from "../services/users";

const LoginForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Debe ingresar una dirección email")
          .required("El email es requerido"),
        password: yup.string().required("La contraseña es requerida"),
      })
    ),
  });
  const [submitError, setSubmitError] = useState(undefined);

  const onSubmit = async (data) => {
    setSubmitError(undefined);
    try {
      const response = await service.loginUser(data);
      setUser(response.data);
      navigate("/player");
    } catch (error) {
      console.error(error);
      setSubmitError("Email o contraseña incorrectos");
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
            form="novalidateform"
            required
            {...methods.register("email")}
          />
          <label htmlFor="email">Email</label>
          <p className="text-danger">
            {methods.formState.errors.email?.message}
          </p>
        </div>
        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="******"
            form="novalidateform"
            required
            {...methods.register("password")}
          />
          <label htmlFor="password">Contraseña</label>
          <p className="text-danger">
            {methods.formState.errors.password?.message}
          </p>
        </div>

        {submitError && <p className="text-danger">{submitError}</p>}
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
