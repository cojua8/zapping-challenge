const LoginForm = () => {
  return (
    <form id="login-form">
      <div className="form-floating mb-4">
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="my@email.com"
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-outline form-floating mb-4">
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="******"
          required
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
            id="set-form-values-button"
            className="btn btn-outline-success btn-block"
          >
            Llenar formulario
          </button>
        </div>
        <p>
          ¿No eres miembro? <a href="signup.html">Regístrate</a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
