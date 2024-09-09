<script>
  import { validator } from "@felte/validator-yup";
  import { createForm } from "felte";
  import { Link, navigate } from "svelte-routing";
  import * as yup from "yup";
  import service from "../services/users";
  import { user } from "../stores/user";

  let submitError = undefined;

  const onSubmit = async (data) => {
    submitError = undefined;
    const response = await service.loginUser(data);
    user.set(response.data);
    navigate("/player");
  };

  const onError = (error) => {
    if (
      error.status === 400 &&
      error.response.data.error == "BAD_CREDENTIALS"
    ) {
      submitError = "Email o contraseña incorrectos";
    } else {
      submitError = "Un error ha ocurrido. Intente nuevamente";
    }
  };

  const { form, setFields, errors } = createForm({
    onSubmit,
    onError,
    extend: validator({
      schema: yup.object().shape({
        email: yup
          .string()
          .email("Debe ingresar una dirección email")
          .required("El email es requerido"),
        password: yup.string().required("La contraseña es requerida"),
      }),
    }),
  });

  const fillForm = () => {
    setFields("email", "john@doe.com");
    setFields("password", "password");
  };
</script>

<form use:form>
  <div class="form-floating mb-4">
    <input
      type="email"
      class="form-control"
      placeholder="my@email.com"
      id="email"
      name="email"
    />
    <label for="email">Email</label>
    {#if $errors.email}
      <p class="text-danger">
        {$errors.email}
      </p>
    {/if}
  </div>
  <div class="form-outline form-floating mb-4">
    <input
      type="password"
      class="form-control"
      placeholder="******"
      id="password"
      name="password"
    />
    <label for="password">Contraseña</label>
    {#if $errors.password}
      <p class="text-danger">
        {$errors.password}
      </p>
    {/if}
  </div>

  {#if submitError}
    <p class="text-danger">
      {submitError}
    </p>
  {/if}
  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
    <div class="d-flex gap-3 flex-wrap">
      <button type="submit" class="btn btn-primary btn-block">
        Iniciar sesión
      </button>
      <button
        type="button"
        on:click={fillForm}
        class="btn btn-outline-success btn-block"
      >
        Llenar formulario
      </button>
    </div>
    <p>
      ¿No eres miembro? <Link to="/signup">Regístrate</Link>
    </p>
  </div>
</form>
