import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "http://192.168.124.18:3000/"
  })
  // console.log(instance(config));
  instance.interceptors.response.use(response => {
    return response.data;
  }, error => {
    return Promise.reject(error)
  })

  return instance(config);
}