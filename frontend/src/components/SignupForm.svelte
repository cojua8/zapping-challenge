<script>
  import { validator } from "@felte/validator-yup";
  import { createForm } from "felte";
  import { navigate } from "svelte-routing";
  import * as yup from "yup";
  import service from "../services/users";
  import { user } from "../stores/user";

  let submitError = undefined;

  const onSubmit = async (data) => {
    submitError = undefined;
    const response = await service.registerUser(data);
    user.set(response.data);
    navigate("/player");
  };

  const onError = (error) => {
    if (error.status === 400) {
      const errorCode = error.response.data.error;
      if (errorCode === "PASSWORDS_DO_NOT_MATCH") {
        submitError = "Las contraseñas no coinciden";
      } else if (errorCode === "USER_ALREADY_EXISTS") {
        submitError = "El usuario ya existe";
      }
    } else {
      submitError = "Un error ha ocurrido. Intente nuevamente";
    }
  };

  const { form, setFields, errors } = createForm({
    onSubmit,
    onError,
    extend: validator({
      schema: yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        email: yup
          .string()
          .email("Debe ingresar una dirección email")
          .required("El email es requerido"),
        password: yup.string().required("La contraseña es requerida"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
      }),
    }),
  });

  const fillForm = () => {
    setFields("name", "John Doe");
    setFields("email", "john@doe.com");
    setFields("password", "password");
    setFields("confirmPassword", "password");
  };
</script>

<form use:form>
  <div class="form-outline form-floating mb-4">
    <input
      type="text"
      id="name"
      name="name"
      class="form-control"
      placeholder="Your Name"
    />
    <label class="form-label" for="name"> Nombre </label>
    {#if $errors.name}
      <p class="text-danger">
        {$errors.name}
      </p>
    {/if}
  </div>

  <div class="form-outline form-floating mb-4">
    <input
      type="email"
      id="email"
      name="email"
      class="form-control"
      placeholder="your@email.com"
    />
    <label class="form-label" for="email"> Email </label>
    {#if $errors.email}
      <p class="text-danger">
        {$errors.email}
      </p>
    {/if}
  </div>

  <div class="form-outline form-floating mb-4">
    <input
      type="password"
      id="password"
      name="password"
      class="form-control"
      placeholder="****"
    />
    <label class="form-label" for="password"> Contraseña </label>
    {#if $errors.password}
      <p class="text-danger">
        {$errors.password}
      </p>
    {/if}
  </div>

  <div class="form-outline form-floating mb-4">
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      class="form-control"
      placeholder="****"
    />
    <label class="form-label" for="confirmPassword">
      Verificar contraseña
    </label>
    {#if $errors.confirmPassword}
      <p class="text-danger">
        {$errors.confirmPassword}
      </p>
    {/if}
  </div>

  {#if submitError}
    <p class="text-danger">
      {submitError}
    </p>
  {/if}
  <div class="d-flex flex-wrap gap-3">
    <button type="submit" class="btn btn-primary btn-block">
      Registrarse
    </button>
    <button
      type="button"
      on:click={fillForm}
      class="btn btn-outline-success btn-block"
    >
      Llenar formulario
    </button>
  </div>
</form>
