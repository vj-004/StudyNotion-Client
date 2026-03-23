import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,value) {
            state.loading = value.payload;
        },
        addCoursesToUser: (state, action) => {
            if (state.user) {
                // action.payload should be the new array of courses
                state.user.courses = [...state.user.courses, ...action.payload];
            }
        },
        addYtCoursesToUser: (state, action) => {
            if(state.user){
                state.user.ytCourses = [...state.user.ytCourses, action.payload]
            }
        },
        addYtCourseProgreesToUser: (state, action) => {
            if(state.user){
                state.user.ytCourseProgress = [...state.user.ytCourseProgress, action.payload]
            }
        },
        updateYtCourseProgress: (state, action) => {
            if(state.user){
                const updatedObj = action.payload; // new object
                const index = state.user.ytCourseProgress.findIndex(
                    (item) => item.playlistUrl === updatedObj.playlistUrl
                );

                if (index !== -1) {
                    state.user.ytCourseProgress[index] = updatedObj;
                }
            }
        }
    },
});

export const {setUser,setLoading,addCoursesToUser,addYtCoursesToUser,addYtCourseProgreesToUser,updateYtCourseProgress} = profileSlice.actions;
export default profileSlice.reducer;