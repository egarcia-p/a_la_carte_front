import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;