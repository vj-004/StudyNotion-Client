import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { login } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';


const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [eye, setEye] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
      e.preventDefault();
      dispatch(login(loginData.email, loginData.password, navigate))
    }


  return (
    <form className='w-full'  onSubmit={handleLogin}>
        <div className='flex flex-col gap-4 text-white'>
              <div className='flex flex-col gap-2'>
                  <label className='text-sm font-inter text-richblack-5'>Email<sup className='text-pink-200'> *</sup></label>
                  <div className='flex flex-row items-center'>
                      <input name='email' type="email" placeholder="Enter Email" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px]`}
                        value={loginData.email}
                        onChange={handleChange}
                      />
                  </div>
              </div>

              <div className='flex flex-col gap-2'>
                  <label className='text-sm font-inter text-richblack-5'>Password<sup className='text-pink-200'> *</sup></label>
                  <div className='flex flex-row items-center'>
                      <input name='password' type={eye ? "text" : "password"} placeholder="Enter Password" className={`box-border rounded-sm p-2 bg-richblack-800 shadow-sm shadow-white/40 w-[444px]`}
                        value={loginData.password}
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
            <Link to={'/forgot-password'} className='w-full flex justify-end text-blue-100'>
                forgot password?
            </Link>
            <div className='w-full text-center mx-auto flex justify-center'>
                <button type='submit' className='bg-yellow-50 text-black shadow-md shadow-richblack-200 rounded-lg  hover:scale-95 transition-all duration-200
                py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                 flex items-center gap-2 justify-center w-full'>Login</button>
            </div>
        </div>
    </form>
  )
}

export default LoginForm