import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className='mx-auto flex flex-col gap-4'>

        <h1 className='text-richblack-5 font-inter text-4xl font-semibold text-center'>Get in Touch</h1>
        <p className='text-base font-medium font-inter text-richblack-300 text-center mb-4'>We’d love to here for you, Please fill out this form.</p>
        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactForm