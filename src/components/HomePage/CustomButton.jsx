import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const CustomButton = ({active, arrow, text, dest}) => {

  return (
    <>
        <Link to={dest}>
            <div className={`group rounded-lg 
            ${active ? "bg-yellow-50 text-black shadow-md shadow-richblack-200" : "bg-richblack-800 text-white shadow-md shadow-richblack-200"}
            hover:scale-95 transition-all duration-200`}>
                <div className='py-3 px-6 font-inter font-medium text-[16px] leading-[24px] text-center 
                 flex items-center gap-2 justify-center'>
                    {text}
                    {
                        arrow === true &&
                        <div>
                            <FaArrowRight/>
                        </div>
                    }
                </div>
                
            </div>
        </Link>
    </>
  )
}

export default CustomButton