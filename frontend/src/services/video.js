import axios from "axios";

const createHttp = (baseURL = import.meta.env.VITE_BACKEND_URL) => {
    return axios.create({
        baseURL,
    });
};

export default {
    setVideoTo(location) {
        return createHttp().post(`/video/move?to=${location}`);
    },
};
