import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const tabs = ["All", "Pending", "Completed"];

const EnrolledCourses = () => {

  const [coursesType, setCoursesType] = useState("All");
  const {user} = useSelector((state) => state.profile);
  const [enrolledCourses, setEnrolledCourses] = useState(user.courses);

  

  console.log('user: ', user);
  

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
            <p className='text-sm font-medium font-inter text-richblack-50 w-[45%] text-center'>Course Name</p>
            <p className='text-sm font-medium font-inter text-richblack-50 w-[20%] text-center'>Durations</p>
            <p className='text-sm font-medium font-inter text-richblack-50 w-[20%] text-center'>Progress</p>
          </div>
          {
            enrolledCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <p className="text-lg text-richblack-300">You are not enrolled in any courses yet.</p>
              </div>
            ) : (
              enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full p-4 border-b border-richblack-700 bg-richblack-800 hover:bg-richblack-900 transition-colors duration-200"
                >
                  {/* Course Info */}
                  <div className="flex items-center gap-4 w-[45%]">
                    <img
                      src={course.thumbnail || "/default-course.png"}
                      alt={course.courseName}
                      className="w-64 h-40 object-cover rounded-lg border border-richblack-600 shadow-sm"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-richblack-5 line-clamp-1">{course.courseName}</h2>
                      <p className="text-xs text-richblack-300 line-clamp-2 mt-1">{course.courseDescription}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="w-[20%] flex items-center justify-center">
                    <span className="text-sm text-richblack-200">--:-- hrs</span>
                  </div>

                  {/* Progress */}
                  <div className="w-[20%] flex flex-col items-center justify-center">
                    <div className="w-full bg-richblack-700 rounded-full h-2 mb-1">
                      <div
                        className="bg-yellow-100 h-2 rounded-full transition-all duration-300"
                        style={{ width: `0%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-richblack-200">0% Complete</span>
                  </div>
                </div>
              ))
            )
          }
        </div>

        
      </div>
      
    </div>
  )
}

export default EnrolledCourses