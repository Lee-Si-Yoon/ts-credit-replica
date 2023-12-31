import Axios from 'axios';

const axios = Axios.create();

export const http = {
  get: async function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then((response) => {
      return response.data;
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async function post<Request = any, Response = unknown>(
    url: string,
    data?: Request
  ) {
    return axios.post<Response>(url, { data }).then((response) => {
      return response.data;
    });
  },
};
