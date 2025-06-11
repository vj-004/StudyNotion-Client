import React, { useState } from 'react'

const tabs = ["All", "Pending", "Completed"];

const EnrolledCourses = () => {

  const [coursesType, setCoursesType] = useState("All");
  const [enrolledCourses, setenrolledCourses] = useState([]);


  return (
    <div className='p-6 w-full'>
      <div className='flex flex-col gap-4'>
        <p className='text-sm font-inter text-richblack-300'>Home / Dashboard / <span className='text-sm font-inter text-yellow-50'>Enrolled Courses</span></p>
        <h1 className='text-3xl font-medium font-inter text-richblack-5'>Enrolled Courses</h1>

        <div className='bg-richblack-800 rounded-full shadow-richblack-200 shadow-sm flex gap-1 w-fit p-1 mt-8'>
          {
            tabs.map((type,index) => (
              <div className='cursor-pointer' onClick={() => setCoursesType(type)} key={index}>
                <p className={`${type === coursesType ? "font-bold text-richblack-5 bg-richblack-900" : "font-medium text-richblack-200"} text-base py-1 px-4 rounded-full font-inter `}>{type}</p>
              </div>
            ))
          }
        </div>

        <div className='flex flex-col w-full rounded-lg p-1 border-1 border-richblack-700'>
          <div className='flex w-full justify-between items-center p-2 bg-richblack-700 rounded-t-lg'>
            <p className='text-sm font-medium font-inter text-richblack-50 w-[45%]'>Course Name</p>
            <p className='text-sm font-medium font-inter text-richblack-50 w-[20%]'>Durations</p>
            <p className='text-sm font-medium font-inter text-richblack-50 w-[20%]'>Progress</p>
          </div>
          {
            enrolledCourses.map((course,index) => (
              <>

              </>
            ))
          }
        </div>

        
      </div>
      
    </div>
  )
}

export default EnrolledCourses