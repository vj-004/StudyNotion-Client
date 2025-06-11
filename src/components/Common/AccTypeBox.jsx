import React from 'react'

const AccTypeBox = ({accType, setAccType}) => {

  return (
    <div className='flex flex-row rounded-full gap-1 px-2 py-1 bg-richblack-800 w-fit cursor-pointer font-semibold shadow-white/40 shadow-sm'>
        <div className={`text-base font-inter  py-2 px-4 ${accType === 'student' ? "bg-richblack-900 text-richblack-5" : "hover:text-richblack-25 text-richblack-200"} rounded-full`}
            onClick={() => {
                setAccType("student")
            }}
        >
            Student
        </div>
        <div className={`text-base font-inter py-2 px-4 ${accType === 'instructor' ? "bg-richblack-900 text-richblack-5" : "hover:text-richblack-25 text-richblack-200"} rounded-full` }
            onClick={() => {
                setAccType("instructor")
            }}
        >
            Instructor
        </div>
    </div>
  )
}

export default AccTypeBox