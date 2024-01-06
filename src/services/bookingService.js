import { httpRequest } from "../axios";

export const savePatientBookAppointment = (bookingData) => {
    let data = JSON.stringify({
        "doctor": {
            "id": bookingData.doctorId
        },
        "email": bookingData.email,
        "date": bookingData.date,
        "timeType": {
            "keyMap": bookingData.timeType
        },
        "patientName": bookingData.patientName,
        "patientPhoneNumber": bookingData.phoneNumber,
        "patientAddress": bookingData.address,
        "patientReason": bookingData.reason,
        "patientGender": {
            "keyMap": bookingData.selectedGender
        },
        "patientBirthday": bookingData.birthday,
        "timeBooking": bookingData.timeString,
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

export const verifyBookAppointment = (token, doctorId) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("token", token);
    urlencoded.append("doctorId", doctorId);

    let config = {
        method: 'post',
        url: '/bookings/verify-booking-appointment',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: urlencoded
    };

    return httpRequest.request(config)
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getAllPatientForDoctor = (doctorId, date) => {
    console.log("check ", doctorId, date)
    let config = {
        method: 'get',
        url: `/bookings?doctorId=${doctorId}&date=${date}`
    };
    return httpRequest.request(config)
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getBookingById = (id) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/bookings/${id}`,
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