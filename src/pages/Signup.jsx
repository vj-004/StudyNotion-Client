import React, { useState } from 'react'
import AccTypeBox from '../components/Common/AccTypeBox'
import SignupImg from '../assets/Images/signup.webp';
import BckFrame from '../assets/Images/frame.png';
import SignupForm from '../components/Forms/SignupForm';

const Signup = () => {

    
    const [accType, setAccType] = useState("student");


  return (
    <div className=' flex p-24 justify-center my-auto w-screen'>
        <div className='flex gap-32'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl font-inter text-richblack-5'>Join the millions learning to<br/> code with StudyNotion for<br/> free</h1>
                    <p className='text-richblack-100 text-lg font-inter '>Build skills for today, tomorrow, and beyond. <span className='text-base font-bold font-edu-sa text-blue-100'>Education <br/> to future-proof your career.</span></p>
                </div>

                <div className='my-6'>
                    <AccTypeBox accType={accType} setAccType={setAccType}/>
                </div>

                <div className='flex flex-col'>
                    <SignupForm accType={accType}/>
                </div>

            </div>
            <div className='relative'>
                <img src={BckFrame} alt='loginbck' loading='lazy' className='absolute top-5 left-5 z-10'/>
                <img src={SignupImg} alt='login' loading='lazy' className='relative z-30'/>
            </div>
        </div>
    </div>
  )
}

export default Signup