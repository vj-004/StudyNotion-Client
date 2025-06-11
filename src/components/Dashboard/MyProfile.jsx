import React from 'react'
import { useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();

  return (
    <div className='p-6 w-full'>
        <div className='flex flex-col gap-4'>
            <p className='text-sm font-medium font-inter text-richblack-300'>Home / Dashboard / <span className='text-yellow-50'>My Profile</span></p>
            <h1 className='text-3xl font-inter font-medium text-richblack-5'>My Profile</h1>
            <div className='p-12 w-10/12 flex flex-col gap-4'>
                {/* Profile */}
                <div className='flex items-center justify-between bg-richblack-800 p-6 rounded-md'>
                    <div className='flex gap-10'>
                        <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='flex items-center gap-x-1 rounded-full h-[78px]'
                        width={"78px"}
                        />
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className='text-lg font-semibold font-inter text-richblack-5'>{user?.firstName + " " +user?.lastName}</p>
                            <p className='text-sm font-inter text-richblack-300'>{user?.email}</p>
                        </div>
                    </div>
                    <button className='flex justify-center items-center p-2 rounded-md text-base font-medium font-inter gap-2 text-richblack-900 bg-yellow-50 h-fit' onClick={() => navigate('/dashboard/settings')}>
                        Edit
                        <FiEdit/>
                    </button>
                </div>

                <div className='flex items-center justify-between bg-richblack-800 p-6 rounded-md flex-col gap-10'>   
                    <div className='flex justify-between items-center w-full'>
                        <p className='text-lg text-richblack-5 '>About</p>
                        <button className='flex justify-center items-center p-2 rounded-md text-base font-medium font-inter gap-2 text-richblack-900 bg-yellow-50 h-fit' onClick={() => navigate('/dashboard/settings')}>
                            Edit
                            <FiEdit/>
                        </button>
                    </div> 
                    <div className='w-full text-richblack-300'>
                        <p>{user.additionalDetails.about}</p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className='flex flex-col gap-2 bg-richblack-800 rounded-md p-6 justify-between items-center w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <h2 className='text-lg font-inter font-semibold text-richblack-5'>Personal Details</h2>
                        <button className='flex justify-center items-center p-2 rounded-md text-base font-medium font-inter gap-2 text-richblack-900 bg-yellow-50 h-fit' onClick={() => navigate('/dashboard/settings')}>
                            Edit
                            <FiEdit/>
                        </button>
                    </div>

                    <div className='flex w-full mt-4'>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>First Name</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.firstName}</p>
                        </div>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>Last Name</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.lastName}</p>
                        </div>
                    </div>

                    <div className='flex w-full mt-4'>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>Email</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.email}</p>
                        </div>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>Phone Number</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.additionalDetails.contactNumber ? user.additionalDetails.contactNumber : <span className='text-red-500'>Please update contact number</span>}</p>
                        </div>
                    </div>

                    <div className='flex w-full mt-4'>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>Gender</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.additionalDetails.gender ? user.additionalDetails.gender : "Add Gender"}</p>
                        </div>
                        <div className='w-[50%] flex flex-col gap-2'>
                            <p className='text-sm font-inter text-richblack-600'>Date Of Birth</p>
                            <p className='text-sm font-inter text-richblack-5'>{user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth : <span className='text-red-500'>Please update contact number</span>}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile