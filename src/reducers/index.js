import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../reducers/slices/authSlice';
import profileReducer from '../reducers/slices/profileSlice';
import cartReducer from '../reducers/slices/cartSlice';
import courseReducer from '../reducers/slices/courseSlice';
import viewCourseReducer from '../reducers/slices/viewCourseSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer
});

export default rootReducer;