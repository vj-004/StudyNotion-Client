import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({course}) => {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-1 w-[384px] hover:cursor-pointer' onClick={() => {
      navigate(`/courses/${course._id}`)
    }}>
        <img
            src={course.thumbnail}
            alt='thumbnail'
            className='w-[384px] h-[201px] rounded-lg'
        />
        <p className='text-richblack-5 font-medium font-inter text-base w-full truncate'>{course.courseName}</p>
        <p className='text-richblack-300 font-inter text-base w-full truncate'>{course.instructor?.firstName}{' '}{course.instructor?.lastName}</p>
        <p className='text-richblack-5 font-semibold font-inter text-xl'>{course.price > 0 ? `Rs. ${course.price}` : "Free"}</p>
    </div>
  )
}

export default CourseCard