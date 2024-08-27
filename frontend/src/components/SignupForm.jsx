import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../contexts/userContext";
import service from "../services/users";

const SignupForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        email: yup
          .string()
          .email("Debe ingresar una dirección email")
          .required("El email es requerido"),
        password: yup.string().required("La contraseña es requerida"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
      })
    ),
  });
  const [submitError, setSubmitError] = useState(undefined);

  const onSubmit = async (data) => {
    setSubmitError(undefined);
    try {
      const response = await service.registerUser(data);
      setUser(response.data);
      navigate("/player");
    } catch (error) {
      console.error(error);
      setSubmitError("Email ya está en uso");
    }
  };

  const fillForm = () => {
    methods.setValue("name", "John Doe");
    methods.setValue("email", "john@doe.com");
    methods.setValue("password", "password");
    methods.setValue("confirmPassword", "password");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="form-outline form-floating mb-4 ">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            required
            form="novalidateform"
            {...methods.register("name", { required: "holahola" })}
          />
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <p className="text-danger">
            {methods.formState.errors.name?.message}
          </p>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="your@email.com"
            required
            form="novalidateform"
            {...methods.register("email")}
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <p className="text-danger">
            {methods.formState.errors.email?.message}
          </p>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="****"
            required
            form="novalidateform"
            {...methods.register("password")}
          />
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
          <p className="text-danger">
            {methods.formState.errors.password?.message}
          </p>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="****"
            required
            form="novalidateform"
            {...methods.register("confirmPassword")}
          />
          <label className="form-label" htmlFor="confirm-password">
            Verificar contraseña
          </label>
          <p className="text-danger">
            {methods.formState.errors.confirmPassword?.message}
          </p>
        </div>
        {submitError && <p className="text-danger">{submitError}</p>}
        <div className="d-flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary btn-block">
            Registrarse
          </button>
          <button
            type="button"
            onClick={fillForm}
            className="btn btn-outline-success btn-block"
          >
            Llenar formulario
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
