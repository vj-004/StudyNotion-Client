import React from 'react'
import HighlightText from '../components/HomePage/HighlightText'
import AboutUs1 from '../assets/Images/aboutus1.webp'
import AboutUs2 from '../assets/Images/aboutus2.webp'
import AboutUs3 from '../assets/Images/aboutus3.webp'
import FoundingImage from '../assets/Images/FoundingStory.png'
import CustomButton from '../components/HomePage/CustomButton'
import Card from '../components/AboutUs/Card'
import ContactForm from '../components/AboutUs/ContactForm'
import Footer from '../components/Footer/Footer'

const Stats = [
    {
        count: "5K",
        label: "Active Students"
    },
    {
        count: "10+",
        label: "Instructors"
    },
    {
        count: "200+",
        label: "Courses"
    },
]

const AboutUs = () => {
  return (
    <div className='flex justify-center items-center mx-auto flex-col gap-5 w-screen'>
        <div className='bg-richblack-800 flex flex-col w-full'>
            <div className='w-11/12 mx-auto flex justify-center items-center flex-col mt-20 gap-10'>
                <p className='text-base font-inter text-richblack-200'>About Us</p>
                <p className='text-4xl font-inter font-semibold text-richblack-5 text-center'>Driving Innovation in Online Education for a<br/><HighlightText text={"Brighter Future"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                <p className='text-base font-medium font-inter text-richblack-300 text-center'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a<br/> brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a<br/>vibrant learning community.
                </p>
            </div>
            <div className='w-full bg-richblack-800 mx-auto flex justify-center items-center flex-col relative h-[300px]'>
                <div className='flex  gap-5 absolute top-[25%] left-[11/12]'>
                    <img src={AboutUs1} alt='' loading='lazy'/>
                    <img src={AboutUs2} alt='' loading='lazy'/>
                    <img src={AboutUs3} alt='' loading='lazy'/>
                </div>
            </div>
        </div>

        <div className='bg-richblack-900 mb-36'>
            <p className='font-inter text-4xl text-center font-semibold text-richblack-100 mt-36'><span className='text-richblack-600'>" </span>We are passionate about revolutionizing the way we learn. Our<br/> innovative platform <HighlightText text={"combines technology"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>, <HighlightText text={"expertise"} gradient={"bg-gradient-to-r from-[#FF512F] to-[#F09819]"}/>, and community to<br/> create an <HighlightText text={"unparalleled educational experience."} gradient={"bg-gradient-to-r from-[#E65C00] to-[#F9D423]"}/><span className='text-richblack-600'> "</span></p>
        </div>

        <div className='w-full mx-auto flex flex-col m-20 gap-10 justify-center items-center'>
            <div className='flex w-[80%] justify-between items-center'>
                <div className='w-[40%] flex flex-col gap-3'>
                    <p className='text-4xl font-semibold font-inter '><HighlightText text={"Our Founding Story"} gradient={"bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"}/></p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>

                <div className='w-[40%]'>
                    <img src={FoundingImage} alt='' loading='lazy'/>
                </div>

            </div>
            <div className='flex w-[80%] justify-between items-center mt-64'>
                <div className='w-[40%] flex flex-col gap-3'>
                    <p className='text-4xl font-semibold font-inter '><HighlightText text={"Our Vision"} gradient={"bg-gradient-to-r from-[#E65C00]  to-[#F9D423]"}/></p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>

                <div className='w-[40%] flex flex-col gap-3'>
                    <p className='text-4xl font-semibold font-inter '><HighlightText text={"Our Mission"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </div>

        <div className='bg-richblack-800 flex flex-col w-full mb-20'>
            <div className='flex flex-col lg:flex-row lg:gap-5 gap-10 justify-between items-center w-[70%] mx-auto my-20'>
                {
                    Stats.map((stat,index) => (
                        <div className='flex flex-col gap-2 justify-center items-center' key={index}>
                            <h2 className='text-3xl font-bold font-inter text-richblack-5'>{stat.count}</h2>
                            <p className='text-base font-inter text-semibold text-richblack-500'>{stat.label}</p>
                        </div>
                    ))
                }
            </div>
        </div>

        <div className='w-[80%] mx-auto flex justify-center items-center flex-col my-20 gap-10'>
            <div className='flex flex-col'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-0'>
                    <div className='flex flex-col gap-3 mb-7 w-[600px] mr-7'>
                        <h1 className='text-4xl font-inter font-semibold text-richblack-5'>World-Class Learning for <HighlightText text={"Anyone, Anywhere"} gradient={"bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB]"}/></h1>
                        <div className='flex flex-col gap-10'>
                            <p className='font-medium font-inter text-richblack-300 text-base'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                            <div className='w-fit'>
                                <CustomButton text={"Learn More"} active={true} arrow={false} dest={'/login'}/>
                            </div>
                        </div>
                    </div>
                    <Card heading={"Curriculum Based on Industry Needs"} description={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} bgColor={"bg-richblack-700"}/>
                    <Card heading={"Our Learning Methods"} description={"The learning process uses the namely online and offline."} bgColor={"bg-richblack-800"}/>
                </div>
                <div className='flex flex-col lg:flex-row items-center lg:justify-end gap-3 mt-3 lg:gap-0 lg:mt-0'>
                    <Card heading={"Certification"} description={"You will get a certificate that can be used as a certification during job hunting."} bgColor={"bg-richblack-700"}/>
                    <Card heading={"Rating 'Auto-grading'"} description={"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."} bgColor={"bg-richblack-800"}/>
                    <Card heading={"Ready to Work"} description={"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."} bgColor={"bg-richblack-700"}/>
                </div>
            </div>
        </div>

        <div className='mb-[140px]'>
            <ContactForm/>
        </div>

        <section>
            <div className='text-white'>
                Reviews from other learners
            </div>
        </section>

        <Footer/>

    </div>
  )
}

export default AboutUs