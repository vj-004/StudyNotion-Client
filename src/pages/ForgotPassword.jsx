import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const handleButton = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }



  return (
    <div className='flex justify-center items-center w-11/12 mx-auto my-auto flex-col gap-5'>

        {
            loading === true ? (<div className='text-white text-3xl'>Loading ...</div>)
            : 
            (
                <>
                    <div className='flex flex-col justify-center w-[444px] gap-5'>
                    <h1 className='font-semibold font-inter text-3xl text-richblack-5'>
                        {
                            emailSent ? "Check email" : "Reset your password"
                        }
                    </h1>
                    <p className='text-lg font-inter text-richblack-100'>
                        {
                            emailSent ? `We have sent the reset email to ${email}` : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        }
                    </p>
                    {
                        !emailSent && (
                            <div className='my-4'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-inter text-richblack-5'>Email<sup className='text-pink-200'> *</sup></label>
                                    <div className='flex flex-row items-center'>
                                        <input name='email' type="email" placeholder="Enter Email" className={`text-richblack-25 box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px]`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className='w-full text-center mx-auto flex justify-center'>
                        <button type='submit' className='bg-yellow-50 text-black shadow-md shadow-richblack-200 rounded-lg  hover:scale-95 transition-all duration-200
                        py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                            flex items-center gap-2 justify-center w-full' onClick={handleButton}>
                                {
                                    emailSent ? "Resend  Email" : "Reset Password"
                                }
                            </button>
                    </div>
                </div>
                
                <div className='w-[444px] '>
                    <Link to={"/login"}>
                        <div className='text-base font-inter text-richblack-5 flex gap-2 items-center justify-start'><IoMdArrowBack />Back to login</div>
                    </Link>
                </div>
                </>
                
            )
        }        
    </div>
  )
}

export default ForgotPassword