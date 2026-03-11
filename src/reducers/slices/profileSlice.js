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
    },
});

export const {setUser,setLoading,addCoursesToUser} = profileSlice.actions;
export default profileSlice.reducer;