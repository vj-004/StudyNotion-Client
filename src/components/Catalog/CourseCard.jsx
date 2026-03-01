import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='flex flex-col gap-1 w-[384px]'>
        <img
            src={course.thumbnail}
            className='w-[384px] h-[201px] rounded-lg'
        />
        <p className='text-richblack-5 font-medium font-inter text-base w-full truncate'>{course.courseName}</p>
        <p className='text-richblack-300 font-inter text-base w-full truncate'>{course.instructor.firstName}{' '}{course.instructor.lastName}</p>
        <p className='text-richblack-5 font-semibold font-inter text-xl'>{course.price > 0 ? `Rs. ${course.price}` : "Free"}</p>
    </div>
  )
}

export default CourseCard