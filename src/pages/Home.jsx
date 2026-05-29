import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/HomePage/HighlightText';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/HomePage/CodeBlocks';
import Timeline from '../components/HomePage/Timeline';
import Learning from '../components/HomePage/Learning';
import Footer from '../components/Footer/Footer';
import Instructor from '../assets/Images/Instructor.png';
import ExploreMore from '../components/HomePage/ExploreMore';
import CustomButton from '../components/Common/CustomButton';

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
                        <p className=''>Get Started</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>Organize your YouTube courses
                Turn YouTube links into
                <HighlightText text={" structured courses"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>

            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
                Paste a YouTube course link and let CourseX organize it into a clear learning path,
                so you can study in the right order, track progress, and focus on what matters most.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CustomButton active={true} text={"Create Course"} dest={"/signup"} arrow={false}/>
                <CustomButton active={false} text={"See How It Works"} dest={"/login"} arrow={false}/>
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
                            Build a <HighlightText text={"structured study path"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/> from any YouTube course.
                        </div>
                    }
                    subheading={
                        "CourseX helps learners turn long video playlists into organized courses with sections, lessons, and a clear order to follow."
                    }

                    btn1={
                        {
                            text: "Start Organizing",
                            active: true,
                            arrow: true,
                            dest: "/signup"
                        }
                    }
                    btn2={
                        {
                            text: "Explore Features",
                            active: false,
                            arrow: false,
                            dest: "/login"
                        }
                    }
                    codeblock={`{\n  title: "React Crash Course",\n  source: "youtube.com/playlist?list=...",\n  sections: ["Setup", "Components", "State", "Routing"],\n  progress: "Track each lesson as you study"\n}`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={"bg-gradient-to-r from-[#8A2BE2]/30 via-[#F8F8FF]/30 to-[#FFA500]/30"}
                />
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div>
                            Keep every lesson <HighlightText text={"in the right order"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
                        </div>
                    }
                    subheading={
                        "Split one YouTube course into sections and lessons so students can follow a structured path instead of jumping between random videos."
                    }

                    btn1={
                        {
                            text: "Start Structuring",
                            active: true,
                            arrow: true,
                            dest: "/login"
                        }
                    }
                    btn2={
                        {
                            text: "View Workflow",
                            active: false,
                            arrow: false,
                            dest: "/signup"
                        }
                    }
                    codeblock={`{\n  course: "Data Structures",\n  lessons: [\n    "Intro",\n    "Arrays",\n    "Stacks",\n    "Queues"\n  ],\n  result: "A clear study plan from one video link"\n}`}
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
                    <p className='w-[45%] font-semibold font-inter text-4xl text-richblack-900'>Turn one video link into a <HighlightText text={" complete study path."} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/> </p>
                    <div className='flex flex-col gap-3  w-[40%] text-base font-inter text-richblack-700'>
                        CourseX helps students and creators break a YouTube course into sections, keep the order clear, and follow a structured learning flow.
                        <div className='w-[28%] mt-8'>
                            <CustomButton text={"Explore Flow"} active={true} arrow={false} dest={"/login"}  />
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
                    <p className='text-4xl font-semibold font-inter text-richblack-5'>Build a course from a <br /><HighlightText text={" YouTube link"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/></p>
                    <p className='text-base font-inter text-richblack-300 w-[70%] mb-10'>Paste a playlist, organize the lessons, and turn scattered videos into a structured course that students can actually follow.</p>
                    <div className='w-fit'>
                        <CustomButton text={"Start Building"} arrow={true} active={true} dest={'/login'}/>
                    </div>
                </div>    
            </div>
            {/* <h2 className='text-center text-4xl font-semibold mt-10 text-white'>Review from other learners</h2> */}
            {/* Review slider here */}
        </div>


        {/* Footer */}
        <Footer/>



    </div>
  )
}

export default Home