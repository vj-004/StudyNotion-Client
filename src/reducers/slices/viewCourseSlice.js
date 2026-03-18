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
            state.courseSectionData = action.payload;
        },
        setTotalNoOfLectures : (state,action) => {
            state.courseSectionData = action.payload;
        },
        setCompletedLectures : (state,action) => {
            state.courseSectionData = action.payload;
        }
        
    }

})