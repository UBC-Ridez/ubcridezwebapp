import axios from "axios";
import { API_URL } from "../GlobalConstants";

export const getApi = async (apiUrl, handleSuccessFunc, handleErrorFunc) => {
  axios
    .get(`${API_URL}/${apiUrl}`)
    .then(response => {
      if (handleSuccessFunc !== undefined) handleSuccessFunc(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      if (handleErrorFunc !== undefined) handleErrorFunc(error);
    });
};

export const postApi = async (
  apiUrl,
  object,
  handleSuccessFunc,
  handleErrorFunc
) => {
  axios
    .post(`${API_URL}/${apiUrl}`, object)
    .then(response => {
      if (handleSuccessFunc !== undefined) handleSuccessFunc(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      if (handleErrorFunc !== undefined) handleErrorFunc(error);
    });
};
