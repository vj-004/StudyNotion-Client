import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form';
import { apiConnecter } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import toast from "react-hot-toast"
import CountryCode from '../../data/countrycode.json';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({email: "", firstName: "", lastName: "", message: "", phoneNo: ""});
        }
    }, [isSubmitSuccessful, reset]);

    const submitContactForm = async (data) => {
        console.log('Logging data: ', data);
        setLoading(true);
        try{

            const response = await apiConnecter("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log('Logging contact us form response ...', response);
            toast.success("Your message hasbeen recieved");
            

        }catch(error){
            console.log(error.message);
        }
        setLoading(false);
    }


  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='w-full'>

        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor='firstName' className='text-sm font-inter text-richblack-5'>First Name</label>
                    <input type='text' name='firstName' id='firstName' placeholder='Enter First Name' 
                        {...register("firstName", {required: true})}
                        className='bg-richblack-800 rounded-md py-1 px-2'
                    />

                    {
                        errors.firstName && (
                            <span className='m-2 text-red font-inter text-sm font-semibold'>Please enter your name</span>
                        )
                    }

                </div>

                {/* lastName */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor='lastName' className='text-sm font-inter text-richblack-5'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' placeholder='Enter Last Name' 
                        {...register("lastName")}
                        className='bg-richblack-800 rounded-md py-1 px-2'
                    />
                </div>
            </div>

            {/* email */}
            <div className='flex flex-col gap-3'>
                <label htmlFor='email' className='text-sm font-inter text-richblack-5'>Email</label>
                <input type='text' name='email' id='email' placeholder='Enter Email' 
                    {...register("email",{required: true})}
                    className='bg-richblack-800 rounded-md py-1 px-2'
                />
                {
                    errors.email && (
                        <span className='m-2 text-red font-inter text-sm font-semibold'>Please enter your email address</span>
                    )
                }
            </div>

            {/*  phone no */}
            
            <div className='flex flex-col gap-3'>
                <label htmlFor='phonenumber' className='text-sm font-inter text-richblack-5'>Phone Number</label>

                <div className='flex gap-5'>

                        <select
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode",{required: true})}
                            className='w-[68px] bg-richblack-800 rounded-md py-1 px-2 text-richblack-5'
                        >
                            {
                                    CountryCode.map((element,index) => (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    ))
                            }
                        </select>

                        <input type='number' name='phonenumber' id='phonenumber' placeholder='12345 67890' className='bg-richblack-800 rounded-md py-1 px-2 text-richblack-5'
                            {...register("phoneNo", {required: {value: true, message: "Please enter phone number"}, maxLength: {value: 10, message: "Invalid Phone Number"}, minLength: {value: 8, message: "Invalid Phone Number"}})}
                        />
                </div>
                {
                    errors.phoneNo && (
                        <span className='m-2 text-red font-inter text-sm font-semibold'>{errors.phoneNo.message}</span>
                    )
                }

            </div>

            {/* message */}

            <div className='flex flex-col gap-3'>
                <label htmlFor='message' className='text-sm font-inter text-richblack-5'>Message</label>
                <textarea name='message' id='message' cols="30" rows="7" placeholder='Enter your message' {...register("message",{required: true})} className='bg-richblack-800 rounded-md py-1 px-2'/>
                {
                    errors.message && (
                        <span className='m-2 text-red font-inter text-sm font-semibold'>Please enter your message</span>
                    )
                }
            </div>

            <button type='submit' className='rounded-md bg-yellow-50 text-center px-6 py-3 font-semibold text-base text-black'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm