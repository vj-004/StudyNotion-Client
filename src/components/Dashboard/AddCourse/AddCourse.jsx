import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CourseInfo from './CourseInfo'
import CourseBuilder from './CourseBuilder'
import CoursePublish from './CoursePublish'
import { FaCheck } from 'react-icons/fa'
import { resetCourseState } from '../../../reducers/slices/courseSlice'

const stepData = [
    {
        id: 1,
        title: "Course Information"
    },
    {
        id: 2,
        title: "Course Builder"
    },
    {
        id: 3,
        title: "Publish"
    },
]

const AddCourse = () => {

    const {step} = useSelector((state) => state.course);
    
  return (
    <div className='p-6 w-full relative flex flex-col sm:justify-center sm:gap-6'>

        <div className='flex-flex-col gap-4'>
            <Link to={'/dashboard/my-profile'} className='text-sm font-inter text-richblack-300 font-medium'> {"<"} Back to Profile</Link>
        </div>

        <ul className='justify-center lg:absolute lg:top-5 lg:right-10 text-xs font-medium font-inter text-richblack-5 pl-10 py-4 pr-2  marker:text-richblack-5 list-disc list-outside bg-richblack-800 border-2 w-[384px] border-richblack-700 rounded-md flex flex-col gap-4'>
            <h1 className='text-lg'>⚡Course Upload Tips</h1>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
        </ul>

        <div className='flex justify-center items-center lg:w-[60%] sm:w-[100%] p-6 mt-10'>
            <div className='flex justify-between w-full flex-col gap-5'>
                <div className='flex w-full justify-between'>
                    {
                    stepData.map((item) => (
                        <div className={`flex flex-col gap-4 items-center w-1/4 relative justify-center`} key={item.id}>
                            <div className='flex items-center'>
                                <div className={`rounded-full flex justify-center items-center p-2 w-8 h-8 font-inter z-10 text-lg ${item.id <= step ? "bg-yellow-900 border-2 border-yellow-50 text-yellow-50" : "bg-richblack-800 border-2 border-richblack-700 text-richblack-300"}`}>
                                    <div className=''>{step > item.id ? <FaCheck/> : item.id}</div>
                                </div>

                            </div>
                            {
                                item.id < 3 && (
                                    <div className={`border-dashed border-[1px] w-full absolute translate-x-[75%] top-[50%]  text-richblack-500 h-0 ${step > item.id ? "border-yellow-50" : "border-richblack-600"}`}></div>
                                )
                            }
                        </div>        
                    ))
                }
                </div>
                <div className='flex w-full justify-between'>
                    {
                    stepData.map((item) => (
                        <div className={`flex flex-col gap-4 items-center w-1/4 relative justify-center`} key={item.id}>
                            <p className={`text-sm font-inter ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>{item.title}</p>
                        </div>        
                    ))
                }
                </div>
            </div>
        </div>

        <div className='p-6 w-full'>
            {
                step === 1 && (
                    <CourseInfo/>
                ) 
            }
            {
                step === 2 && (
                    <CourseBuilder/>
                )
            }
            {
                step === 3 && (
                    <CoursePublish/>
                )
            }
        </div>

    </div>
  )
}

export default AddCourse