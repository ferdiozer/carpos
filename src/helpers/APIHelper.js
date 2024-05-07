import axios from 'axios';
import { showToast } from './ToastHelper';
import { getHeaders } from './AuthHelper';
import { store } from '../StateManagment/Redux/Store/Index';
import { onLogOut } from '../StateManagment/Redux/Actions/Index';
import { apiUrls } from '../StateManagment/Redux/Api/constants';

const parseErrorCode = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch(onLogOut());
    } else if (error.response.status === 404) {
      const { message } = error.response.data;
      showToast({ message });
    }
  } else {
    showToast({ message: "Beklenmedik bir hata oluştu" });
  }

  return Promise.reject(error.response);
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async (config) => {
    const headers = await getHeaders();
    config.baseURL = apiUrls.base
    if (headers) {
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error),
);

export default API;
