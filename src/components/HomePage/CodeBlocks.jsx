import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import CustomButton from '../Common/CustomButton'

const CodeBlocks = ({
    position, heading,subheading,btn1,btn2,codeblock,backgroundGradient,codeColor
}) => {


  return (
    <div className={`flex justify-between w-full my-20 gap-10 ${position}`}>
        <div className='flex flex-col w-[40%]'>
            <div className='font-inter text-4xl font-bold'>
                {heading}
            </div>
            <div className='font-medium font-inter text-base text-richblack-300 mt-4'>
                {subheading}
            </div>
            <div className='flex flex-row gap-7 mt-7'>
                <CustomButton active={btn1.active} text={btn1.text} dest={btn1.dest} arrow={btn1.arrow}/>
                <CustomButton active={btn2.active} text={btn2.text} dest={btn2.dest} arrow={btn2.arrow}/>
            </div>
        </div>
        <div className='flex flex-row text-[14px] w-[40%] py-4 bg-gradient-to-r from-[#0E1A2D]/20 to-[#111E32]/40 opacity-90'>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            
            <div className={`w-[500px] relative flex flex-col gap-2 font-bold font-mon ${codeColor} pr-2 whitespace-pre`}>
                <div className={`absolute -top-10 -left-10 w-[300px] h-[250px] ${backgroundGradient} blur-3xl rounded-full z-10`}>
                    
                </div>
                <TypeAnimation
                    sequence={[codeblock,500,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks