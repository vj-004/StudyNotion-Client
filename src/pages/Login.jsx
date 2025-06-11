import React from 'react'
import LoginForm from '../components/Forms/LoginForm';
import LoginImg from '../assets/Images/login.webp';
import BckFrame from '../assets/Images/frame.png';

const Login = () => {

  return (
    <div className=' flex p-24 justify-center items-center w-screen my-auto'>
        <div className='flex gap-32'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl font-inter text-richblack-5'>Welcome Back</h1>
                    <p className='text-richblack-100 text-lg font-inter '>Build skills for today, tomorrow, and beyond. <span className='text-base font-bold font-edu-sa text-blue-100'>Education <br/> to future-proof your career.</span></p>
                </div>

                <div className='flex flex-col' >
                    <LoginForm/>
                </div>

            </div>
            <div className='relative'>
                <img src={BckFrame} alt='loginbck' loading='lazy' className='absolute top-5 left-5 z-10'/>
                <img src={LoginImg} alt='login' loading='lazy' className='relative z-30'/>
            </div>
        </div>
    </div>
  )
}

export default Login