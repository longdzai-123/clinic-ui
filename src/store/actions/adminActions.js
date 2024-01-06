import actionTypes from './actionTypes';
import { getAllcode, createNewUserService, getAllUser, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctor, saveDetailDoctor, saveDoctorInformation } from '../../services/userService';
import { getAllSpecialty } from "./../../services/specialtyService"
import { getAllClinic } from "./../../services/clinicService"
import { toast } from "react-toastify";
import { filterDrugs } from "./../../services/drugService"

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let response = await getAllcode('gender')
            if (response && response.code === 200) {
                dispatch(fetchGenderSuccess(response.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log(e)
        }

    }
}

export const fetchGenderSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genders
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllcode('position')
            if (response && response.code === 200) {
                dispatch(fetchPositionSuccess(response.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log(e)
        }

    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllcode('role')
            if (response && response.code === 200) {
                dispatch(fetchRoleSuccess(response.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log(e)
        }

    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.code === 200) {
                toast.success("Thêm mới người dùng thành công!");
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log("createUserFailed error", e);
        }
    };
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUser();
            if (response && response.code === 200) {
                dispatch(fetchAllUsersSuccess(response.data.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersFailed error", e);
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});



export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserService(userId);
            const language = getState().app.language;
            if (response && response.code === 200) {

                if (language && language === "vi") {
                    toast.success("Xóa người dùng thành công!");
                } else {
                    toast.success("Delete the user succeed!");
                }
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                if (language && language === "vi") {
                    toast.error("Không xóa được người dùng!");
                } else {
                    toast.error("Delete the user error!");
                }

                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed error", e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const language = getState().app.language;
            let response = await editUserService(data);
            if (response && response.code === 200) {
                if (language && language === "vi") {
                    toast.success("Cập nhật người dùng thành công!");
                } else {
                    toast.success("Update user succeed!");
                }

                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                if (language && language === "vi") {
                    toast.error("Cập nhật người dùng thất bại!");
                } else {
                    toast.error("Update user failed!");
                }

                dispatch(editUserFailed());
            }
        } catch (e) {

            const language = getState().app.language;
            if (language && language === "vi") {
                toast.error("Cập nhật người dùng thất bại!");
            } else {
                toast.error("Update user failed!");
            }
            dispatch(editUserFailed());
            console.log("EditUserFailed error", e);
        }
    };
};

// export const editOnlyOneUser = (data) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await editUserService(data);
//             if (res) return res;
//         } catch (e) {
//             console.log("EditUserFailed error", e);
//         }
//     };
// };

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorHomeService(limit);
            if (response && response.code === 200) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTORS_FAILED", e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctor();
            if (response && response.code === 200) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILED", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDrugs = () => {
    return async (dispatch, getState) => {
        try {
            let response = await filterDrugs("");
            console.log(response)
            if (response && response.code === 200) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DRUGS_SUCCESS,
                    dataDrugs: response.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DRUGS_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILED", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DRUGS_FAILED,
            });
        }
    };
};


export const saveDetailDoctorAction = (dataMarkdown, dataInfor) => {
    console.log(dataMarkdown)
    console.log(dataInfor)
    return async (dispatch, getState) => {
        try {
            let resMarkdown = await saveDetailDoctor(dataMarkdown);
            let resInfor = await saveDoctorInformation(dataInfor)
            const language = getState().app.language;

            if (resMarkdown && resMarkdown.code === 200 && resInfor && resInfor.code === 200) {
                if (language && language === "vi") {
                    toast.success("Lưu thông tin chi tiết bác sĩ thành công!");
                } else {
                    toast.success("Save Infor Detail Doctor succeed!");
                }

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {

                if (language && language === "vi") {
                    toast.error("Lưu thông tin chi tiết bác sĩ thất bại!");
                } else {
                    toast.error("Save Infor Detail Doctor error!");
                }

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            const language = getState().app.language;
            if (language && language === "vi") {
                toast.error("Lưu thông tin chi tiết bác sĩ thất bại!");
            } else {
                toast.error("Save Infor Detail Doctor error!");
            }
            console.log("SAVE_DETAIL_DOCTOR_FAILED", e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcode("TIME");
            if (res && res.code === 200) {
                dispatch({
                    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED", e);
            dispatch({
                type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllcode("PRICE");
            let resPayment = await getAllcode("PAYMENT");
            let resProvince = await getAllcode("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (
                resPrice &&
                resPrice.code === 200 &&
                resPayment &&
                resPayment.code === 200 &&
                resProvince &&
                resProvince.code === 200 &&
                resSpecialty &&
                resSpecialty.code === 200 &&
                resClinic &&
                resClinic.code === 200
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforFailed error", e);
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});


