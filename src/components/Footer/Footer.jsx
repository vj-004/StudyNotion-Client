import React from 'react'
import lightLogo from '../../assets/Logo/Logo-Full-Light.png'; 
import ListHeading from './ListHeading';
import ListItem from './ListItem';
import {FooterLinks} from '../../data/footer-links';

const Footer = () => {
  return (
    <div className='bg-richblack-800 border-t border-richblack-600 w-full justify-center items-center'>

        <div className='py-8 px-32 flex gap-[20px] w-full justify-between h-full'>

          {/* Section left */}
          <div className='flex flex-row w-[45%] justify-between'>
            <div className='flex flex-col gap-3'>
              <img src={lightLogo} alt='Logo' loading='lazy' width={"160"}/>
              <ListHeading text={"Company"} />
              <ListItem text={"About"} />
              <ListItem text={"Affiliates"} />
              <ListItem text={"Careers"} />
              <div>
                {/* social media icons */}
              </div>
            </div>
            
            <div className='flex flex-col gap-3'>
              <ListHeading text={"Resources"}/>
              <ListItem text={"Articles"} />
              <ListItem text={"Blog"} />
              <ListItem text={"Chart Sheet"} />
              <ListItem text={"Code challenges"} />
              <ListItem text={"Docs"} />
              <ListItem text={"Projects"} />
              <ListItem text={"Videos"} />
              <ListItem text={"Workspaces"} />

              <ListHeading text={"Support"} />
              <ListItem text={"Help Center"}/>

            </div>

            <div className='flex flex-col gap-3'>
              <ListHeading text={"Plans"}/>
              <ListItem text={"Paid memberships"} />
              <ListItem text={"For students"} />
              <ListItem text={"Business solutions"} />

              <ListHeading text={"Community"}/>
              <ListItem text={"Forums"} />
              <ListItem text={"Chapters"} />
              <ListItem text={"Events"} />
            </div>

          </div>

          {/* Line separating them */}
          <div className='w-[2px] bg-richblack-700'></div>

          {/* Section right */}
          <div className='flex flex-row gap-12 w-[45%]'>
            
            {
              FooterLinks.map((box,index) => (
                <div className='flex flex-col gap-3' key={index}>
                  <ListHeading text={box.title} />
                  {
                    box.links.map((link,index) => 
                      <ListItem text={link.title} link={link.link} key={index}/>
                    )
                  }
                </div>
              ))
            }

          </div>


        </div>

        <div className='w-[85%] mx-auto h-[3px] bg-richblack-700 my-2'></div>

        <div className='h-[10%] flex justify-between px-32 py-8'>
          <div className='flex gap-1 items-center'>
            <p className='text-sm font-inter text-richblack-300'>Privacy Policy</p>
            <div className='h-[70%] w-[2px] bg-richblack-700'></div>
            <p className='text-sm font-inter text-richblack-300'>Cookie Policy</p>
            <div className='h-[70%] w-[2px] bg-richblack-700'></div>
            <p className='text-sm font-inter text-richblack-300'>Terms</p>
          </div>
          <p className='text-sm font-inter text-richblack-300 '>Made by Vayun Jain @ 2025 StudyNotion</p>
        </div>

    </div>
  )
}

export default Footer