import axios from "axios";

const createHttp = (baseURL = import.meta.env.VITE_BACKEND_URL) => {
  return axios.create({
    baseURL,
  });
};

export default {
  setVideoToEnd() {
    return createHttp().post("/video/end");
  },
};
