import { httpRequest } from "../axios";

export const postSendRemedy = (dataRemedy) => {
    console.log(dataRemedy)
    let data = JSON.stringify(
        dataRemedy
    );

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/remedy',
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

export const updateRemedyService = (dataRemedy) => {
    console.log(dataRemedy)
    let data = JSON.stringify(
        dataRemedy
    );

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: '/remedy',
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

export const getRemedyByBookingId = (bookingId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/remedy?bookingId=${bookingId}`,
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
