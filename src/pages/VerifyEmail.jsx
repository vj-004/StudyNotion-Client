import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SendOTP, signup } from '../services/operations/authAPI';
import { IoMdArrowBack } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";

const VerifyEmail = () => {

    const {loading,signupData} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            navigate('/signup');
        }
    }, [signupData, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...signupData,
            otp,
            navigate
        };


        console.log('Signup data', signupData);

        dispatch(signup(payload));
    }

  return (
    <div className='flex justify-center items-center w-11/12 mx-auto my-auto flex-col gap-5 '>
        {
            loading ? (<div className='text-white text-3xl'>Loading...</div>)
            : 
            (
                <div className='flex flex-col justify-center w-[444px] gap-5'>
                    <h1 className='font-semibold font-inter text-3xl text-richblack-5'>Verify email</h1>
                    <p className='text-lg font-inter text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (<input {...props} className='bg-richblack-800 text-richblack-5 text-3xl font-medium mx-5 rounded-md' placeholder='-'/>)}
                        />
                        <button type='submit' className='bg-yellow-50 text-black shadow-md shadow-richblack-200 rounded-lg  hover:scale-95 transition-all duration-200
                            py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                            flex items-center gap-2 justify-center w-full mt-8'
                            onClick={handleSubmit}
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className='w-[444px] flex justify-between'>
                        <Link to={"/login"}>
                            <div className='text-base font-inter text-richblack-5 flex gap-2 items-center justify-start'><IoMdArrowBack />Back to login</div>
                        </Link>

                        <button onClick={() => dispatch(SendOTP(signupData.email,navigate))} className='text-blue-100 text-base font-inter font-medium flex gap-2 justify-center items-center'>
                            <FaClockRotateLeft /> Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail