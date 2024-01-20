import { httpRequest } from "../axios";

export const getAllClinic = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/clinic/all',
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

export const getAllClinicLimit = (limit) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/clinic?limit=${limit}`,
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

export const createNewClinic = (clinicData) => {
  let data = JSON.stringify({
    "name": clinicData.name,
    "address": clinicData.address,
    "image": clinicData.imageBase64,
    "descriptionHTML": clinicData.descriptionHTML,
    "descriptionMarkdown": clinicData.descriptionMarkdown,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/clinic',
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

export const updateClinic = (clinicData) => {
  let data = JSON.stringify({
    "id": clinicData.id,
    "name": clinicData.name,
    "address": clinicData.address,
    "image": clinicData.image,
    "descriptionHTML": clinicData.descriptionHTML,
    "descriptionMarkdown": clinicData.descriptionMarkdown,
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/clinic',
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

export const getClinicById = (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/clinic/${id}`,
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

export const searchByNameAndAddress = (data) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/clinic/search?nameClinic=${data.name}&nameAddress=${data.address}`,
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

export const deleteClinic = (id) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `/clinic/${id}`,
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


