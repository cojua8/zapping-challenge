const SignupForm = () => {
  return (
    <form id="signup-form">
      <div className="form-outline form-floating mb-4">
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Your Name"
          required
        />
        <label className="form-label" htmlFor="name">
          Nombre
        </label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="your@email.com"
          required
        />
        <label className="form-label" htmlFor="email">
          Email
        </label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="****"
          required
        />
        <label className="form-label" htmlFor="password">
          Contraseña
        </label>
      </div>

      <div className="form-outline form-floating mb-4">
        <input
          type="password"
          id="confirm-password"
          className="form-control"
          placeholder="****"
          required
        />
        <label className="form-label" htmlFor="confirm-password">
          Verificar contraseña
        </label>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary btn-block">
          Registrarse
        </button>
        <button
          type="button"
          id="set-form-values-button"
          className="btn btn-outline-success btn-block"
        >
          Llenar formulario
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
