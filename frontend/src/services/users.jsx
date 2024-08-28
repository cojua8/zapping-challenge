import axios from "axios";

const createHttp = (
  baseURL = import.meta.env.VITE_BACKEND_URL,
  contentType = "application/json"
) => {
  const headers = {
    "Content-Type": contentType,
  };
  return axios.create({
    baseURL,
    headers,
  });
};

export default {
  loginUser({ email, password }) {
    return createHttp().post(`/users/login/`, {
      email,
      password,
    });
  },
  registerUser(data) {
    return createHttp().post(`/users/register/`, data);
  },
};
