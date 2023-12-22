import { httpRequest } from "../axios";

export const createNewSpecialty = (specialtyData) => {
  let data = JSON.stringify({
    "descriptionHTML": specialtyData.descriptionHTML,
    "descriptionMarkdown": specialtyData.descriptionMarkdown,
    "image": specialtyData.imageBase64,
    "name": specialtyData.name,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/bookings',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data
  };
  return httpRequest.request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

export const getAllSpecialty = (limit) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/specialty?limit=${limit}`,
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