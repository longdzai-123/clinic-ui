import { httpRequest } from "../axios";

export const getProfileDoctorById = (doctorId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor-infor/profile/${doctorId}`,
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

export const getDoctorInforById = (doctorId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor-infor/get-by/${doctorId}`,
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

export const getDoctorInforBySpecialtyAndProvince = (specialtyId, provinceId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor-infor/get-by-specialty?specialtyId=${specialtyId}&provinceId=${provinceId}`,
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

