import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoUpload } from "react-icons/go";
import CountryCode from '../../data/countrycode.json';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteUserAccount, updatePassword, updateUserPicture, updateUserProfile } from '../../services/operations/settingsAPI';
import ConfirmationModal from '../Common/ConfirmationModal';
import toast from 'react-hot-toast';

const Settings = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [file, setFile] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        ...user.additionalDetails,
        confirmPassword: "",
        password: ""
    });
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value,
        })
    }

    const handleUpload = () => {
        if(file){
            dispatch(updateUserPicture(file,token));
        }
        else{
            toast.error("Please select an image to upload");
        }
    }

  return (
    <div className='p-6 w-full'>
        <div className='flex flex-col gap-4'>
            <p className='text-sm font-inter text-richblack-300'>{"< " + "Back"}</p>
            <h1 className='font-medium text-3xl font-inter text-richblack-5'>Edit Profile</h1>
            <div className='flex justify-between px-12 py-12 pb-4 w-10/12 flex-col gap-4'>
                    {/* Change Profile */}
                 <div className='flex items-center gap-10 bg-richblack-800 p-6 rounded-md'>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='flex items-center gap-x-1 rounded-full h-[78px]'
                        width={"78px"}
                        height={"78px"}
                        />
                    <div className='flex flex-col gap-3'>
                        <p className='text-richblack-25'>Change profile picture</p>
                        <div className='flex gap-3'>
                            <label htmlFor="profileImg" className='p-2 rounded-md bg-yellow-50 text-richblack-900 w-fit text-base font-medium font-inter cursor-pointer hover:scale-95 transition-all duration-200 flex items-center gap-2'>
                                Select
                            </label>
                            <input
                                id="profileImg"
                                type="file"
                                accept="image/*"  // optional: restrict to images
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFile(file);
                                    } else {
                                    console.log('No file selected.');
                                    }
                                }}
                                />

                            <button className='text-base font-medium font-inter text-richblack-50 p-2 rounded-md bg-richblack-700 w-fit cursor-pointer hover:scale-95 transition-all duration-200' onClick={handleUpload}>
                                <div className='flex gap-2 items-center'>
                                    <GoUpload/>
                                    <div>
                                        Upload
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                 </div>

                {/* Change Profile Information */}
                <div className='flex justify-center gap-10 bg-richblack-800 p-6 rounded-md flex-col'>
                    <p className='text-lg font-semibold font-inter text-richblack-5'>Profile Information</p>
                    <div className='flex w-full justify-between'>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor="firstName" className='text-sm font-inter text-richblack-5'>First Name</label>
                            <input type='text' id='firstName' value={user.firstName} name='firstName' className='p-2 rounded-md bg-richblack-700 text-richblack-300 text-base font-medium font-inter' readOnly/>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor="lastName" className='text-sm font-inter text-richblack-5'>Last Name</label>
                            <input type='text' id='lastName' value={user.lastName} name='lastName' className='p-2 rounded-md bg-richblack-700 text-richblack-300 text-base font-medium font-inter' readOnly/>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor="firstName" className='text-sm font-inter text-richblack-5'>Date Of Birth</label>
                            <input type='date' id='firstName' value={updatedUser.dateOfBirth ? updatedUser.dateOfBirth : "2000-01-01"} name='dateOfBirth' onChange={handleChange} className='p-2 rounded-md bg-richblack-700 text-richblack-5 text-base font-medium font-inter'/>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor="lastName" className='text-sm font-inter text-richblack-5'>Gender</label>
                            <select id='lastName' value={updatedUser.gender} name='gender' onChange={handleChange} className='p-2 rounded-md bg-richblack-700 text-richblack-5 text-base font-medium font-inter'>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Other"}>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor='phonenumber' className='text-sm font-inter text-richblack-5'>Phone Number</label>
                            <div className='flex gap-5'>
                                    <select
                                        name='dropdown'
                                        id='dropdown'
                                        className='w-[68px] bg-richblack-700 rounded-md p-2 text-richblack-5'
                                    >
                                        {
                                                CountryCode.map((element,index) => (
                                                    <option key={index} value={element.code}>
                                                        {element.code} -{element.country}
                                                    </option>
                                                ))
                                        }
                                    </select>

                                    <input type='number' name='contactNumber' id='contactNumber' placeholder={updatedUser.contactNumber ? "" : "1234567890"} className='bg-richblack-700 rounded-md p-2 text-richblack-5'
                                        value={updatedUser.contactNumber}
                                        onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4'>
                            <label htmlFor="about" className='text-sm font-inter text-richblack-5'>About</label>
                            <input id='about' name='about' type='text' value={updatedUser.about} placeholder={!updatedUser.about ? "Enter bio details" : ""} onChange={handleChange} className='p-2 rounded-md bg-richblack-700 text-richblack-5 text-base font-medium font-inter'/>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-end w-[80%] gap-4'>
                <div className='flex gap-2 w-fit'>
                    <button className='bg-richblack-700 rounded-md  text-base font-medium font-inter text-richblack-5 w-fit py-2 px-6'
                        onClick={() => navigate('/dashboard/my-profile')}
                    >
                        Cancel
                    </button>
                    <button className='bg-yellow-50 rounded-md  text-base font-medium font-inter text-richblack-900 w-fit transition-all duration-200 py-2 px-6 hover:scale-95'
                        onClick={() => {
                            dispatch(updateUserProfile(updatedUser,token,navigate));
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className='flex justify-between px-12 py-12 pb-4 w-10/12 flex-col gap-4'>
                
                <div className='flex flex-col gap-10 bg-richblack-800 p-6 rounded-md'>
                    <h1 className='text-lg font-semibold font-inter text-richblack-5'>Change Password</h1>
                    <div className='flex w-full gap-2 justify-between'>
                        <div className='flex flex-col gap-2 w-[45%]'>
                            <label htmlFor="password" className='text-sm font-inter text-richblack-5'>Password <sup className='text-red-500'>*</sup></label>
                            <input type='password' id='password' placeholder='****************' value={updatedUser.password} onChange={handleChange} name='password' className='p-2 rounded-md bg-richblack-700 text-richblack-5 text-base font-medium font-inter'/>
                        </div>
                        <div className='flex flex-col gap-2 w-[45%]'>
                            <label htmlFor="confirmPassword" className='text-sm font-inter text-richblack-5'>Confirm Password <sup className='text-red-500'>*</sup></label>
                            <input type='password' id='confirmPassword' placeholder='****************' value={updatedUser.confirmPassword} onChange={handleChange} name='confirmPassword' className='p-2 rounded-md bg-richblack-700 text-richblack-5 text-base font-medium font-inter'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end w-[80%] gap-4'>
                <div className='flex gap-2 w-fit'>
                    <button className='bg-richblack-700 rounded-md  text-base font-medium font-inter text-richblack-5 w-fit py-2 px-6'
                        onClick={() => navigate('/dashboard/my-profile')}
                    >
                        Cancel
                    </button>
                    <button className='bg-yellow-50 rounded-md  text-base font-medium font-inter text-richblack-900 w-fit py-2 px-6'
                        onClick={() => dispatch(updatePassword(user.email,updatedUser.password, updatedUser.confirmPassword,token, navigate))}
                    >
                        Update
                    </button>
                </div>
            </div>
            <div className='flex justify-between px-12 py-12 pb-4 w-10/12 flex-col gap-4'>
                <div className='flex gap-5 bg-pink-900 border-2 border-pink-700 rounded-md p-6'>
                    <div className='text-pink-200 text-2xl bg-pink-700 rounded-full h-fit p-3 font-semibold font-inter'>
                        <FaRegTrashAlt/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg font-bold font-inter text-pink-5'>Delete Account</h1>
                        <p className='text-sm font-medium font-inter text-pink-25'>Would you like to delete account?</p>
                        <p className='text-sm font-medium font-inter text-pink-25'>This account contains Paid Courses. Deleting your account will remove all<br/> the contain associated with it.</p>
                        <button onClick={() => setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "Your account will be non-recoverable",
                            btn1Text: "Delete",
                            btn2Text: "Close",
                            btn1Handler: () => dispatch(deleteUserAccount(user.email,token,navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        }) } className='text-base font-inter font-medium italic text-pink-300 text-start'>I want to delete my account.</button>
                    </div>
                </div>
            </div>
            {
                confirmationModal && <>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slideDown shadow-lg z-40">
                        <ConfirmationModal modalData={confirmationModal}/>
                    </div>
                </>
            }

            
        </div>
    </div>
  )
}

export default Settings