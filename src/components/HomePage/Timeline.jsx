import React from 'react'

import Logo1 from '../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../assets/TimeLineLogo/Logo4.svg';
import timelineImg from '../../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
        {
        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]

const Timeline = () => {
  return (
    <div className='w-11/12 max-w-maxContent items-center p-20'>
        <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%] flex flex-col gap-5 justify-start'>
                {
                    timeline.map((obj,index) => (
                        <div className='flex gap-5 my-4' key={index}>
                            <div className='rounded-full bg-white w-[52px] h-[52px] items-center justify-center flex'>
                                <img src={obj.Logo} alt='logo1' loading='lazy' />
                            </div>
                            <div>
                                <p className='text-lg font-semibold text-richblack-800'>{obj.heading}</p>
                                <p className='text-sm font-inter text-richblack-700'>{obj.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div>
                <div className='relative'>
                    <img src={timelineImg} alt='timeline' loading='lazy' width={545} className='relative shadow-[18px_18px_0px_-1px_rgba(255,255,255,1)] z-10' />
                    <div className='absolute w-[511px] bg-caribbeangreen-700 flex left-[17px] -bottom-[35px] px-10 py-4 justify-center items-center z-20'>
                        <div className='flex w-[161px] gap-3'>
                            <p className='text-4xl font-bold font-inter text-white'>10</p>
                            <p className='text-sm font-inter text-caribbeangreen-300'>YEARS EXPERIENCES</p>
                        </div>
                        <div className=' w-[2px] mx-auto bg-caribbeangreen-500 my-2 h-[44px]'></div>
                        <div className='flex w-[161px] gap-3'>
                            <p className='text-4xl font-bold font-inter text-white'>250</p>
                            <p className='text-sm font-inter text-caribbeangreen-300'>TYPES OF COURSES</p>
                        </div>
                    </div>
                    <div className='absolute bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] w-[600px] h-[400px] blur-3xl rounded-full top-0 -left-10'></div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Timeline