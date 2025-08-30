import axios from "axios";

const apiRequestService = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

apiRequestService.interceptors.request.use();

export default apiRequestService;
