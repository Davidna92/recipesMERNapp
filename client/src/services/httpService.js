import axios from "axios";
import { toast } from "react-toastify";
import storageService from "./storageService";

axios.defaults.headers.common["x-auth-token"] = storageService.getJwtToken();

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("פרטים אלו לא קיימים במערכת, נסה להרשם");
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
