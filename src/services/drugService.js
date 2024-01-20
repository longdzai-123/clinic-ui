import { httpRequest } from "../axios";

export const filterDrugs = (keyWord) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/drugs/search?keyWord=${keyWord}`
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

export const deleteDrug = (id) => {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/drugs/${id}`,
    };
    return httpRequest.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getAllDrug = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/drugs',
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

export const createDrug = (dataDrug) => {
    console.log(dataDrug)
    let data = JSON.stringify(
        dataDrug
    );

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/drugs',
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

export const updateDrug = (dataDrug) => {
    console.log(dataDrug)
    let data = JSON.stringify(
        dataDrug
    );

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: '/drugs',
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

export const getDrugById = (id) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/drugs/${id}`,
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