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
    url: '/specialty',
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

export const updateSpecialty = (specialtyData) => {
  let data = JSON.stringify({
    "id": specialtyData.id,
    "descriptionHTML": specialtyData.descriptionHTML,
    "descriptionMarkdown": specialtyData.descriptionMarkdown,
    "image": specialtyData.image,
    "name": specialtyData.name,
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/specialty',
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

export const getAllSpecialtyLimit = (limit) => {
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

export const getAllSpecialty = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/specialty/all',
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

export const getSpecialtyById = (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/specialty/${id}`,
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

export const deleteSpecialty = (id) => {

  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `/specialty/${id}`,
  };
  return httpRequest.request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

export const searchByName = (name) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/specialty/search?keyWord=${name}`,
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