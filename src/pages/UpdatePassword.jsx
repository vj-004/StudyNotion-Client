import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [eye, setEye] = useState(false);
    const [eye1, setEye1] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [resetPasswordForm, setResetPasswordForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const{password, confirmPassword} = resetPasswordForm;

    const checks = ["one lowercase character", "one uppercase character", "one number", "one special character", "8 character minimum"];
    const regxCheck = [/[a-z]/, /[A-Z]/, /\d/, /[!@#$%^&*(),.?":{}|<>]/];
    const [checkValues,setCheckValues] = useState([0,0,0,0,0]);
    const handleChange = (e) => {
        setResetPasswordForm({
            ...resetPasswordForm,
            [e.target.name]: e.target.value,
        });
        if(e.target.name === 'password'){
            if(e.target.value.length >= 8){
                setCheckValues((prev) => {
                    const updated = [...prev];
                    updated[4] = 1;
                    return updated;
                });
            }
            else{
                setCheckValues((prev) => {
                    const updated = [...prev];
                    updated[4] = 0;
                    return updated;
                });
            }
            for(let i = 0;i<4;i++){
                const regex = regxCheck[i];
                if(regex.test(e.target.value)){
                    setCheckValues((prev) => {
                        const updated = [...prev];
                        updated[i] = 1;
                        return updated;
                    });
                }
                else{
                    setCheckValues((prev) => {
                        const updated = [...prev];
                        updated[i] = 0;
                        return updated;
                    });
                }
            }
        }   

    }

    const handleSubmit = () => {
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }


  return (
    <div className='flex justify-center items-center w-11/12 mx-auto my-auto flex-col gap-5'>
        {
            loading ? (
                <div className='text-white text-3xl'>
                    Loading ...
                </div>
            ):
            (
                <div className='flex flex-col justify-center w-[444px] gap-5'>
                    <h1 className='text-3xl font-inter text-richblack-5 font-semibold'>Choose New Password</h1>
                    <p className='text-lg font-inter text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-inter text-richblack-5'>New Password<sup className='text-pink-200'> *</sup></label>
                        <div className='flex flex-row items-center'>
                            <input type={eye ? "text" : "password"} placeholder="Enter Password" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px] text-richblack-5`}
                                name='password'
                                required
                                value={resetPasswordForm.password}
                                onChange={handleChange}
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
                        <label className='text-sm font-inter text-richblack-5'>Confirm new password<sup className='text-pink-200'> *</sup></label>
                        <div className='flex flex-row items-center'>
                            <input type={eye ? "text" : "password"} placeholder="Enter Password" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px] text-richblack-5`}
                                name='confirmPassword'
                                required
                                value={resetPasswordForm.confirmPassword}
                                onChange={handleChange}
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

                    {
                        <div className='flex flex-col h-[52px] flex-wrap gap-[2px]'>
                            {
                                checks.map((criteria,index) => (
                                    <div key={index} className={`${checkValues[index] === 0 ? "text-red-300" : "text-caribbeangreen-300"} text-xs font-inter flex gap-2 items-center`}>
                                        <FaCircleCheck/>
                                        {criteria}
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <div className='w-full text-center mx-auto flex justify-center'>
                        <button type='submit' className='bg-yellow-50 text-black shadow-md shadow-richblack-200 rounded-lg  hover:scale-95 transition-all duration-200
                            py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                            flex items-center gap-2 justify-center w-full'
                            onClick={handleSubmit}
                        >
                            Reset Password
                        </button>
                    </div>

                    <div className='w-[444px] '>
                        <Link to={"/login"}>
                            <div className='text-base font-inter text-richblack-5 flex gap-2 items-center justify-start'><IoMdArrowBack />Back to login</div>
                        </Link>
                    </div>

                </div>
            )
        }


    </div>
  )
}

export default UpdatePassword