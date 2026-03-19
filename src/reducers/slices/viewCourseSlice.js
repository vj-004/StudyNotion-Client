import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectres: 0
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {

        setCourseSectionData : (state,action) => {
            state.courseSectionData = action.payload;
        },
        setEntireCourseData : (state,action) => {
            state.courseEntireData = action.payload;
        },
        setTotalNoOfLectures : (state,action) => {
            state.totalNoOfLectres = action.payload;
        },
        setCompletedLectures : (state,action) => {
            state.completedLectures = action.payload;
        }
        
    }

});

export const {setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,setCompletedLectures} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;