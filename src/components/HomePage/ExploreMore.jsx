import React, { useState } from 'react';
import {HomePageExplore} from '../../data/homepage-explore';
import HighlightText from './HighlightText';
import { MdPeopleAlt } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log('current heading',result[0].courses[0].heading);
    }

    return (
    <div className='flex flex-col gap-5'>

        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={" Power of Code"} gradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
        </div>

        <p className='text-richblack-300 text-center text-base'>Learn to Build Anything You Can Imagine</p>

        <div className='flex flex-row rounded-full bg-richblack-800 mb-5 mx-auto p-1'>
            {
                tabs.map((element,index) => (
                    <div className={`text-[16px] flex flex-row items-center gap-2 
                        ${currentTab === element ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"} 
                        rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-3`}
                        key={index}
                        onClick={() => setMyCard(element)}
                    >
                        {element}
                    </div>
                ))
            }
        </div>

        <div className='flex gap-8 p-5 -mt-14'>

             {
                courses.map((element,index) => (
                    <div key={index} className={`${currentCard === element.heading ? "bg-white shadow-[18px_18px_0px_-1px_rgba(255,214,10,1)]" : "bg-richblack-800"} flex p-6 flex-col justify-between item h-[300px] w-[341px] translate-y-[20%]
                        transition-all duration-200 cursor-pointer
                    `}
                        onClick={() => setCurrentCard(element.heading)}
                    >
                        <div className='flex flex-col gap-4'>
                            <p className={`font-semibold text-xl font-inter ${currentCard === element.heading ? "text-richblack-800" : "text-richblack-25"} `}>{element.heading}</p>
                            <p className='text-base font-inter text-richblack-500'>{element.description}</p>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-base font-inter font-semibold flex ${currentCard === element.heading ? "text-blue-500" : "text-richblack-300"} justify-center items-center gap-1`}>
                                <MdPeopleAlt />
                                {element.level}
                            </div>
                            <div className={`text-base font-inter font-semibold  flex ${currentCard === element.heading ? "text-blue-500" : "text-richblack-300"} justify-center items-center gap-1`}>
                                <RiOrganizationChart />
                                {element.lessionNumber}
                                {" "}Lessons
                            </div>
                        </div>
                    </div>
                ))
            }

           

        </div>


    </div>
  )
}

export default ExploreMore