import React from 'react'
import CoursePublish from './AddCourse/CoursePublish';
import CourseBuilder from './AddCourse/CourseBuilder';
import CourseInfo from './AddCourse/CourseInfo';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa'

const stepData = [
    {
        id: 1,
        title: "Course Information"
    },
    {
        id: 2,
        title: "Course Builder"
    },
    {
        id: 3,
        title: "Publish"
    },
];

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);
    

  return (
    <>  

        <div className='flex justify-center items-center lg:w-[60%] sm:w-[100%] p-6 mt-10'>
            <div className='flex justify-between w-full flex-col gap-5'>
                <div className='flex w-full justify-between'>
                    {
                    stepData.map((item) => (
                        <div className={`flex flex-col gap-4 items-center w-1/4 relative justify-center`} key={item.id}>
                            <div className='flex items-center'>
                                <div className={`rounded-full flex justify-center items-center p-2 w-8 h-8 font-inter z-10 text-lg ${item.id <= step ? "bg-yellow-900 border-2 border-yellow-50 text-yellow-50" : "bg-richblack-800 border-2 border-richblack-700 text-richblack-300"}`}>
                                    <div className=''>{step > item.id ? <FaCheck/> : item.id}</div>
                                </div>

                            </div>
                            {
                                item.id < 3 && (
                                    <div className={`border-dashed border-[1px] w-full absolute translate-x-[75%] top-[50%]  text-richblack-500 h-0 ${step > item.id ? "border-yellow-50" : "border-richblack-600"}`}></div>
                                )
                            }
                        </div>        
                    ))
                }
                </div>
                <div className='flex w-full justify-between'>
                    {
                    stepData.map((item) => (
                        <div className={`flex flex-col gap-4 items-center w-1/4 relative justify-center`} key={item.id}>
                            <p className={`text-sm font-inter ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>{item.title}</p>
                        </div>        
                    ))
                }
                </div>
            </div>
        </div>

        <div className='mt-16'>
            {
                step === 1 && (
                    <CourseInfo/>
                ) 
            }
            {
                step === 2 && (
                    <CourseBuilder/>
                )
            }
            {
                step === 3 && (
                    <CoursePublish/>
                )
            }
        </div>
    </>
  )
}

export default RenderSteps