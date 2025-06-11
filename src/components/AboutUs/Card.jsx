import React from 'react'

const Card = ({heading, description,bgColor}) => {
  return (
    <div className={`p-5 flex flex-col ${bgColor} gap-3 w-[294px] h-[294px]`}>
        <p className='text-lg font-semibold font-inter text-richblack-5'>{heading}</p>
        <p className='text-sm font-inter text-richblack-100'>{description}</p>
    </div>
  )
}

export default Card