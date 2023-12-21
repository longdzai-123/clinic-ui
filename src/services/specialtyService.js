import { httpRequest } from "../axios";

export const getAllSpecialty = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/specialty',
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