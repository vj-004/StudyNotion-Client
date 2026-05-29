import React from 'react'
import HighlightText from '../components/HomePage/HighlightText'
import AboutUs1 from '../assets/Images/aboutus1.webp'
import AboutUs2 from '../assets/Images/aboutus2.webp'
import AboutUs3 from '../assets/Images/aboutus3.webp'
import FoundingImage from '../assets/Images/FoundingStory.png'
import Card from '../components/AboutUs/Card'
import ContactForm from '../components/AboutUs/ContactForm'
import Footer from '../components/Footer/Footer'
import CustomButton from '../components/Common/CustomButton'

const Stats = [
    {
        count: "1",
        label: "Learning Platform"
    },
    {
        count: "YouTube",
        label: "Course Sources"
    },
    {
        count: "Structured",
        label: "Study Paths"
    },
]

const AboutUs = () => {
  return (
    <div className='flex justify-center items-center mx-auto flex-col gap-5 w-screen'>
        <div className='bg-richblack-800 flex flex-col w-full'>
            <div className='w-11/12 mx-auto flex justify-center items-center flex-col mt-20 gap-10'>
                {/* <p className='text-base font-inter text-richblack-200'>About Us</p> */}
                <p className='text-4xl font-inter font-semibold text-richblack-5 text-center'>Helping learners turn YouTube courses into a<br/><HighlightText text={"Clear Study Path"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                <p className='text-base font-medium font-inter text-richblack-300 text-center'>
                    CourseX helps students and creators organize YouTube playlists into structured courses with sections, lessons, and a clear order to follow.
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
            <p className='font-inter text-4xl text-center font-semibold text-richblack-100 mt-36'><span className='text-richblack-600'>" </span>We believe learning works best when it is organized, easy to follow, and built around real content. Our<br/> platform combines <HighlightText text={"structure"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>, <HighlightText text={"clarity"} gradient={"bg-gradient-to-r from-[#FF512F] to-[#F09819]"}/>, and <HighlightText text={"progress tracking"} gradient={"bg-gradient-to-r from-[#E65C00] to-[#F9D423]"}/> to<br/> create a better way to learn from YouTube courses.<span className='text-richblack-600'> "</span></p>
        </div>

        <div className='w-full mx-auto flex flex-col m-20 gap-10 justify-center items-center'>
            <div className='flex w-[80%] justify-between items-center'>
                <div className='w-[40%] flex flex-col gap-3'>
                    <p className='text-4xl font-semibold font-inter '><HighlightText text={"Our Founding Story"} gradient={"bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"}/></p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        CourseX started with a simple problem: many great YouTube courses are hard to follow because the learning order is scattered across long playlists and unorganized videos.
                    </p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        We wanted to make it easier for students to study from those videos in a more structured way, so we built a platform that helps turn one link into a course with a clear path.
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
                        Our vision is to make every useful YouTube course easier to study by giving learners a clean structure, a sensible sequence, and a better way to stay on track.
                    </p>
                </div>

                <div className='w-[40%] flex flex-col gap-3'>
                    <p className='text-4xl font-semibold font-inter '><HighlightText text={"Our Mission"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                    <p className='text-base font-medium font-inter text-richblack-300'>
                        Our mission is to help learners focus on progress instead of clutter by making YouTube-based learning feel organized, practical, and easy to return to.
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
                        <h1 className='text-4xl font-inter font-semibold text-richblack-5'>Structured Learning for <HighlightText text={"Anyone, Anywhere"} gradient={"bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB]"}/></h1>
                        <div className='flex flex-col gap-10'>
                            <p className='font-medium font-inter text-richblack-300 text-base'>CourseX gives learners a simple way to transform YouTube courses into clear study paths so they can learn with more focus and less friction.</p>
                            <div className='w-fit'>
                                <CustomButton text={"Explore CourseX"} active={true} arrow={false} dest={'/login'}/>
                            </div>
                        </div>
                    </div>
                    <Card heading={"Built Around Real Video Content"} description={"Turn a playlist into a structured course that feels easier to follow from the start."} bgColor={"bg-richblack-700"}/>
                    <Card heading={"Simple Learning Flow"} description={"Organize lessons in order so students always know what to study next."} bgColor={"bg-richblack-800"}/>
                </div>
                <div className='flex flex-col lg:flex-row items-center lg:justify-end gap-3 mt-3 lg:gap-0 lg:mt-0'>
                    <Card heading={"Track Progress"} description={"See what has been completed and continue from the right place anytime."} bgColor={"bg-richblack-700"}/>
                    <Card heading={"Lesson Order"} description={"Keep every section organized so the course stays clear and easy to revisit."} bgColor={"bg-richblack-800"}/>
                    <Card heading={"One Link, One Course"} description={"Build a full study path from a single YouTube source instead of juggling scattered videos."} bgColor={"bg-richblack-700"}/>
                </div>
            </div>
        </div>

        <div className='mb-[70px]'>
            <ContactForm/>
        </div>
{/* 
        <section>
            <div className='text-white'>
                Reviews from other learners
            </div>
        </section> */}

        <Footer/>

    </div>
  )
}

export default AboutUs