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
        
    }

})