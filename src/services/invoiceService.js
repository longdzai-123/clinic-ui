import { httpRequest } from "../axios";

export const getAllInvoiceByDoctorId = (doctorId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/invoices?doctorId=${doctorId}`,
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

export const confirmPayment = (invoiceId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/invoices/confirm-payment?invoiceId=${invoiceId}`,
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