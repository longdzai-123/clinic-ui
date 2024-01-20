import { httpRequest } from "../axios";

export const getAllUnit = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/unit-drug',
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

