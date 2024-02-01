import {SHOW_DOCTOR_MODEL, SHOW_DOCTOR_EDIT_MODEL, SHOW_DOCTOR_INFO_MODEL, UPDATE_DOCTORS, SET_CURRENT_DOCTOR, UPDATE_DOCTOR_STATUS} from "../action-types/doctorActionTypes";

const initialState = {
    showDoctorModal: false,
    showDoctorEditModal: false,
    showDoctorInfoModal: false,
    doctors: [],
    pageCount: 0,
    doctor: {}
};

const doctorReducer = (state = initialState, action) => {   
    switch (action.type) {
        case SHOW_DOCTOR_MODEL:
            return {
                ...state,
                showDoctorModal: action.payload
            };
        case SHOW_DOCTOR_EDIT_MODEL:
            return {
                ...state,
                showDoctorEditModal: action.payload,
            }
        case SHOW_DOCTOR_INFO_MODEL:
            return {
                ...state,
                showDoctorInfoModal: action.payload,
            }
        case UPDATE_DOCTORS:
            return {
                ...state,
                doctors: [...action.payload],
            }
        case SET_CURRENT_DOCTOR:
            return {
                ...state,
                doctor: action.payload,
            }
        case UPDATE_DOCTOR_STATUS:
            const updatedDocIndex = state.doctors.findIndex(item => item.doctorId === state.doctor.doctorId)
            return {
                ...state,
                doctor: {...state.doctor, status: action.payload},
                doctors: state.doctors.map((item, index) => index === updatedDocIndex ? {...item, status: action.payload} : item)
            }
        
        default:
            return state;
    }
};

export default doctorReducer;