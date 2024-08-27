import axios from "axios";

const createHttp = (baseURL = "http://localhost:3000") => {
  return axios.create({
    baseURL,
  });
};

export default {
  setVideoToEnd() {
    return createHttp().post("/video/end");
  },
};
