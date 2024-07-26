import {combineReducers} from "redux";
import doctorReducer from "./doctorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({doctor: doctorReducer, auth: authReducer});

export default rootReducer