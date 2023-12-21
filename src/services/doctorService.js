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

