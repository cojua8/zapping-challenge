import { FormProvider, useForm } from "react-hook-form";

const SignupForm = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  const fillForm = () => {
    methods.setValue("name", "John Doe");
    methods.setValue("email", "john@doe.com");
    methods.setValue("password", "password");
    methods.setValue("confirm-password", "password");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="form-outline form-floating mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            required
            {...methods.register("name")}
          />
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="your@email.com"
            required
            {...methods.register("email")}
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="****"
            required
            {...methods.register("password")}
          />
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
        </div>

        <div className="form-outline form-floating mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="****"
            required
            {...methods.register("confirm-password")}
          />
          <label className="form-label" htmlFor="confirm-password">
            Verificar contraseña
          </label>
        </div>

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
