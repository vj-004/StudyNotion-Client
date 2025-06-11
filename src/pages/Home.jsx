import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/HomePage/HighlightText';
import CustomButton from '../components/HomePage/CustomButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/HomePage/CodeBlocks';
import Timeline from '../components/HomePage/Timeline';
import Learning from '../components/HomePage/Learning';
import Footer from '../components/Footer/Footer';
import Instructor from '../assets/Images/Instructor.png';
import ExploreMore from '../components/HomePage/ExploreMore';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}

        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>

            {/* stuling of buttons can be worked on */}

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit shadow-md shadow-richblack-200'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200
                    group-hover:bg-richblack-900 '>
                        <p className=''>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={" Coding Skills"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>

            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                and get access to a wealth of resources, including hands-on projects, quizzes, and personalized 
                feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CustomButton active={true} text={"Learn More"} dest={"/signup"} arrow={false}/>
                <CustomButton active={false} text={"Book  A Demo"} dest={"/login"} arrow={false}/>
            </div>

            <div className=' relative mx-3 mt-16 mb-12'>
                <video 
                muted 
                loop
                autoPlay
                className='shadow-[18px_18px_0px_-1px_rgba(255,255,255,1)] relative z-20'
                >
                    <source src={Banner} type='video/mp4'/>
                </video>
                <div className='w-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] blur-3xl absolute z-10 top-10 left-0 h-10'>

                </div>
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div>
                            Unlock your <HighlightText text={" coding potential"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/> with our online courses.
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    btn1={
                        {
                            text: "Try it yourself",
                            active: true,
                            arrow: true,
                            dest: "/signup"
                        }
                    }
                    btn2={
                        {
                            text: "Learn More",
                            active: false,
                            arrow: false,
                            dest: "/login"
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={"bg-gradient-to-r from-[#8A2BE2]/30 via-[#F8F8FF]/30 to-[#FFA500]/30"}
                />
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div>
                            Start <HighlightText text={" coding in seconds"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }

                    btn1={
                        {
                            text: "Continue Lesson",
                            active: true,
                            arrow: true,
                            dest: "/login"
                        }
                    }
                    btn2={
                        {
                            text: "Learn More",
                            active: false,
                            arrow: false,
                            dest: "/signup"
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={"bg-gradient-to-r from-[#1FA2FF]/30 via-[#12D8FA]/30 to-[#A6FFCB]/30"}
                />
            </div>

            <ExploreMore/>

        </div>


        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 justify-center items-center flex flex-col'>
            <div className={`bg-[url(/src/assets/Images/image.png)] h-[310px] bg-fit flex justify-center items-center w-screen`}>
                  <div className='flex gap-3'>
                    <CustomButton text={"Explore Full Catalog"} arrow={true} active={true} dest={"/signup"} />
                     <CustomButton text={"Learn More"} arrow={false} active={false} dest={"/login"} />  
                  </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-5 py-20'>
                <div className='flex justify-between w-full'>
                    <p className='w-[45%] font-semibold font-inter text-4xl text-richblack-900'>Get the skills you need for a <HighlightText text={" job that is in demand."} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/> </p>
                    <div className='flex flex-col gap-3  w-[40%] text-base font-inter text-richblack-700'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        <div className='w-[28%] mt-8'>
                            <CustomButton text={"Learn More"} active={true} arrow={false} dest={"/login"}  />
                        </div>    
                    </div>
                    
                </div>
            </div>

            <Timeline/>
            <Learning/>

        </div>

        {/* Section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex justify-center items-center flex-col'>
            <div className='flex p-20 gap-20'>
                <img src={Instructor} alt='image1' loading='lazy' className='shadow-[-18px_-18px_0px_-1px_rgba(255,255,255,1)]'/>
                <div className='flex flex-col gap-8 justify-center w-[50%]'>
                    <p className='text-4xl font-semibold font-inter text-richblack-5'>Become an <br /><HighlightText text={" instructor"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                    <p className='text-base font-inter text-richblack-300 w-[70%] mb-10'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <div className='w-fit'>
                        <CustomButton text={"Start Teaching Today"} arrow={true} active={true} dest={'/login'}/>
                    </div>
                </div>    
            </div>
            <h2 className='text-center text-4xl font-semibold mt-10 text-white'>Review from other learners</h2>
            {/* Review slider here */}
        </div>


        {/* Footer */}
        <Footer/>



    </div>
  )
}

export default Home