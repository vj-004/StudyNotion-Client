import React from 'react'
import { IoMdChatboxes } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import ContactUsForm from '../components/AboutUs/ContactUsForm';
import Footer from '../components/Footer/Footer';

const contactUsData = [
    {
        icon: <IoMdChatboxes />,
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        end: "@mail address"
    },
    {
        icon: <FaEarthAfrica />,
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        end: "Here is the location/ address"
    },
    {
        icon: <IoIosCall />,
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        end: "+123 456 7890"
    }
]

const ContactUs = () => {
  return (
    <div className='w-screen flex flex-col'>
        <div className='flex w-11/12 mx-auto justify-center mt-20 gap-16'>
            <div className='w-[30%] rounded-lg bg-richblack-800 p-6 flex flex-col flex-start h-fit'>
                {
                    contactUsData.map((element,index) => (
                        <div key={index} className='flex gap-4 text-2xl mb-10'>
                            <div className='text-richblack-100'>
                                {element.icon}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-lg font-semibold font-inter text-richblack-5'>{element.heading}</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>{element.description}</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>{element.end}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col w-[45%] gap-4 border border-richblack-600 p-10 rounded-lg'>
                <h1 className='text-4xl font-semibold font-inter text-richblack-5 '>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='text-base font-medium font-inter text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
                <ContactUsForm/>
            </div>
        </div>

        <div>
            <h1 className='text-white'>Reviews from other learners</h1>
        </div>

        <Footer/>

    </div>
  )
}

export default ContactUs