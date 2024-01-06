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