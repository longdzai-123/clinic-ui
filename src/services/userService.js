
import { httpRequest } from "../axios";

export const handleLoginApi = (email, password) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    let config = {
        method: 'post',
        url: '/user/login-system',
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

export const getAllUser = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/user/all',
        headers: {}
    };

    return httpRequest.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createNewUserService = (dataUser) => {
    console.log(dataUser)
    let data = JSON.stringify({
        "email": dataUser.email,
        "password": dataUser.password,
        "firstName": dataUser.firstName,
        "lastName": dataUser.lastName,
        "address": dataUser.address,
        "gender": dataUser.gender,
        "roleId": dataUser.roleId,
        "phoneNumber": dataUser.phoneNumber,
        "positionId": dataUser.positionId,
        "image": dataUser.avatar
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/user/manager-create',
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

export const deleteUserService = (id) => {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/user/${id}`,
    };
    return httpRequest.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getAllcode = (type) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/allcodes?type=${type}`,
    };
    return httpRequest.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}

export const editUserService = (dataUser) => {
    let data = JSON.stringify({
        "id": dataUser.id,
        "email": dataUser.email,
        "password": dataUser.password,
        "firstName": dataUser.firstName,
        "lastName": dataUser.lastName,
        "address": dataUser.address,
        "gender": dataUser.gender,
        "roleId": dataUser.roleId,
        "phoneNumber": dataUser.phoneNumber,
        "positionId": dataUser.positionId,
        "image": dataUser.avatar
    });

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: '/user/manager-update',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
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

export const getTopDoctorHomeService = (limit) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor/get-top-doctor-home?size=${limit}`,
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


export const getAllDoctor = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/doctor/get-all-doctor',
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

export const getDetailInforDoctor = (id) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor/get-details-doctor/${id}`,
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

export const getDoctorInfor = (id) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor-infor/${id}`,
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


export const saveDetailDoctor = (dataMarkdown) => {
    let data = JSON.stringify({
        "contentHTML": dataMarkdown.contentHTML,
        "contentMarkdown": dataMarkdown.contentMarkdown,
        "description": dataMarkdown.description,
        "doctorId": dataMarkdown.doctorId,
        "specialtyId": dataMarkdown.specialtyId,
        "clinicId": dataMarkdown.clinicId
    });

    let config = {
        method: `${dataMarkdown.action}`,
        maxBodyLength: Infinity,
        url: '/markdown',
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

export const saveDoctorInformation = (doctorInfor) => {
    let data = JSON.stringify({
        "user": {
            "id": doctorInfor.doctorId
        },
        "specialty": {
            "id": doctorInfor.specialtyId
        },
        "clinic": {
            "id": doctorInfor.clinicId
        },
        "priceId": doctorInfor.selectedPrice,
        "provinceId": doctorInfor.selectedProvice,
        "paymentId": doctorInfor.selectedPayment,
        "nameClinic": doctorInfor.nameClinic,
        "addressClinic": doctorInfor.addressClinic,
        "note": doctorInfor.note,
    });

    let config = {
        method: `${doctorInfor.action}`,
        maxBodyLength: Infinity,
        url: '/doctor-infor',
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



export const saveScheduleDoctor = (arrSchedule) => {
    console.log(arrSchedule)
    let data = JSON.stringify(arrSchedule);

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: '/schedule',
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

export const getScheduleDoctorByDate = (doctorId, date) => {
    console.log("check ", doctorId, date)
    let config = {
        method: 'get',
        url: `/schedule/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
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

export const getExtraInforDoctorById = (doctorId) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/doctor-infor/extra/${doctorId}`,
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





