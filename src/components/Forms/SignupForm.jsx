import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../reducers/slices/authSlice';
import { SendOTP } from '../../services/operations/authAPI';
import toast from 'react-hot-toast';

const SignupForm = ({accType}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupData, setsignupData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })

    const handleSignup = (e) => {
        e.preventDefault();
        
        if (signupData.password !== signupData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        const formData = {
            ...signupData,
            accountType: accType,
        };

        console.log('form data', formData);

        dispatch(setSignupData(formData));
        dispatch(SendOTP(formData.email, navigate));
        
    }

    const handleChange = (e) => {
        setsignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    }

    const [eye, setEye] = useState(false);
    const [eye1, setEye1] = useState(false);

  return (
    <form className='w-full'  onSubmit={handleSignup}>
        <div className='flex flex-col gap-4 text-white'>
            <div className='flex flex-row gap-[20px]'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-inter text-richblack-5'>First Name<sup className='text-pink-200'> *</sup></label>
                    <div className='flex flex-row items-center'>
                        <input type="text" placeholder="First Name" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[212px]`}
                            onChange={handleChange}
                            value={signupData.firstName}
                            name='firstName'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-inter text-richblack-5'>Last Name<sup className='text-pink-200'> *</sup></label>
                    <div className='flex flex-row items-center'>
                        <input type="text" placeholder="Last Name" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[212px]`}
                            onChange={handleChange}
                            value={signupData.lastName}
                            name='lastName'
                        />
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-inter text-richblack-5'>Email<sup className='text-pink-200'> *</sup></label>
                <div className='flex flex-row items-center'>
                    <input type="email" placeholder="Enter Email" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px]`}
                        onChange={handleChange}
                        value={signupData.email}
                        name='email'
                    />
                </div>
            </div>
            <div className='flex flex-row gap-[40px]'>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-inter text-richblack-5'>Create Password<sup className='text-pink-200'> *</sup></label>
                    <div className='flex flex-row items-center'>
                        <input type={eye ? "text" : "password"} placeholder="Enter Password" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[212px]`}
                            onChange={handleChange}
                            value={signupData.password}
                            name='password'
                        />
                        {
                        eye === false && <div className='text-richblack-300 text-2xl -ml-10'
                                onClick={() => setEye(true)}
                            >
                                <IoEye/>
                            </div>
                        }
                        {
                            eye === true && <div className='text-richblack-300 text-2xl -ml-10'
                                onClick={() => setEye(false)}
                            >
                                <IoEyeOff/>
                            </div>
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-inter text-richblack-5'>Confirm Password<sup className='text-pink-200'> *</sup></label>
                    <div className='flex flex-row items-center'>
                        <input type={eye1 ? "text" : "password"} placeholder="Enter Password" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[212px]`}
                            onChange={handleChange}
                            value={signupData.confirmPassword}
                            name='confirmPassword'

                        />
                        {
                        eye1 === false && <div className='text-richblack-300 text-2xl -ml-10'
                                onClick={() => setEye1(true)}
                            >
                                <IoEye/>
                            </div>
                        }
                        {
                            eye1 === true && <div className='text-richblack-300 text-2xl -ml-10'
                                onClick={() => setEye1(false)}
                            >
                                <IoEyeOff/>
                            </div>
                        }
                    </div>
                </div>

            </div>
            <div className='w-full text-center mx-auto flex justify-center'>
                <button type='submit' className='bg-yellow-50 text-black shadow-md shadow-richblack-200 rounded-lg  hover:scale-95 transition-all duration-200
                py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                 flex items-center gap-2 justify-center w-full'>SignUp</button>
            </div>
        </div>
    </form>
  )
}

export default SignupForm