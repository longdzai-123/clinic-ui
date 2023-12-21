import { httpRequest } from "../axios";

export const getAllClinic = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/clinic',
  };
  return httpRequest.request(config)
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}