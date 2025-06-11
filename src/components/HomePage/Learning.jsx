import React from 'react'
import HighlightText from './HighlightText'
import PlanLesson from '../../assets/Images/Plan_your_lessons.png';
import KnowProgress from '../../assets/Images/Know_your_progress.png';
import CompareProgress from '../../assets/Images/Compare_with_others.png';
import CustomButton from './CustomButton';

const Learning = () => {
  return (
    <div className='flex flex-col justify-center items-center p-14'>

        <div className='mx-auto gap-4 flex flex-col justify-center items-center'>
            <p className='text-4xl font-semibold font-inter text-richblack-900 text-center'>Your swiss knife for <HighlightText text={" learning any language"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
            <p className='text-base font-inter text-richblack-700 w-[70%] text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>

        <div className='flex items-center justify-center '>
            <img src={KnowProgress} alt='' loading='lazy' className='object-contain -mr-32'/>
            <img src={CompareProgress} alt='' loading='lazy' className='object-contain '/>
            <img src={PlanLesson} alt='' loading='lazy' className='object-contain -ml-36'/>
        </div>

        <CustomButton text={"Learn More"} active={true} arrow={true} dest={"/login"} />
    </div>
  )
}

export default Learning