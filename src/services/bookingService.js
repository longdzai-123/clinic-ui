import { httpRequest } from "../axios";

export const savePatientBookAppointment = (bookingData) => {
    let data = JSON.stringify({
        "doctorId": bookingData.doctorId,
        "email": bookingData.email,
        "date": bookingData.date,
        "timeType": bookingData.timeType,
        "patientName": bookingData.patientName,
        "patientPhoneNumber": bookingData.phoneNumber,
        "patientAddress": bookingData.address,
        "patientReason": bookingData.reason,
        "patientGender": bookingData.selectedGender,
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