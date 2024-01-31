import {SHOW_DOCTOR_MODEL, SHOW_DOCTOR_EDIT_MODEL, SHOW_DOCTOR_INFO_MODEL, UPDATE_DOCTORS, SET_CURRENT_DOCTOR, UPDATE_DOCTOR_STATUS} from "../action-types/doctorActionTypes";

export const showDocModel = (value) => {
    return {
        type: SHOW_DOCTOR_MODEL,
        payload: value,
    };
};

export const showDocEditModel = (value) => {
    return {
        type: SHOW_DOCTOR_EDIT_MODEL,
        payload: value,
    };
};

export const showDocInfoModel = (value) => {
    return {
        type: SHOW_DOCTOR_INFO_MODEL,
        payload: value,
    };
};

export const updateDoctors = (value) => {
    return {
        type: UPDATE_DOCTORS,
        payload: value,
    };
};

export const setCurrentDoctor = (value) => {
    return {
        type: SET_CURRENT_DOCTOR,
        payload: value,
    };
};

export const updateDoctorStatus = (value) => {
    return {
        type: UPDATE_DOCTOR_STATUS,
        payload: value,
    };
};