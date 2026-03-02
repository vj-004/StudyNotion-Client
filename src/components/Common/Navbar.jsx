import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/courseX_logo.png'
import {InstructorNavbarLinks, StudentNavbarLinks} from '../../data/navbar-links';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../Auth/ProfileDropDown';
import { apiConnecter } from '../../services/apiConnector';
import { categories } from '../../services/apis';


const Navbar = () => {

  const location = useLocation();

  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);
  const {totalItems} = useSelector( (state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try{
      const result = await apiConnecter("GET", categories.CATEGORIES_API);
      //console.log('data: ', result.data.allCategories);
      setSubLinks(result.data.allCategories);
    }
    catch(error){
      console.log('could not fetch category list ', error);
    }
  } 

  useEffect(() => {

    fetchSubLinks();

  }, [])
  


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800'>
      <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
        
        <Link to={'/'}>
          <img src={Logo} width={150} height={40} alt='logo' loading='lazy' className='mt-3'/>
        </Link>

        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              user && user?.accountType === 'student' && (
                StudentNavbarLinks.map((link,index) => (
                  <li key={index} className='hover:text-richblack-5'>
                    <Link to={link?.path} >
                      <p className={`${matchPath({path:link?.path}, location.pathname) ? "text-yellow-25" : "text-richblack-25 hover:scale-95"} transition-all duration-200 font-semibold`}>{link.title}</p>
                    </Link>
                  </li>
                ))
              )
            }
            {
              user && user?.accountType === 'instructor' && (
                InstructorNavbarLinks.map((link,index) => (
                  <li key={index} className='hover:text-richblack-5'>
                    <Link to={link?.path} >
                      <p className={`${matchPath({path:link?.path}, location.pathname) ? "text-yellow-25" : "text-richblack-25 hover:scale-95"} transition-all duration-200 font-semibold`}>{link.title}</p>
                    </Link>
                  </li>
                ))
              )
            }
          </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>

           {
            user && user?.accountType === 'student' && (
              <Link to={'/dashboard/cart'} className='relative text-richblack-200 flex justify-center items-center text-3xl hover:text-richblack-5'>
                <AiOutlineShoppingCart className='relative z-10'/>
              </Link>
            )
           }
            
          {
            token === null && (
              <Link to={'/login'}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 font-bold'>
                  Log In
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={'/signup'}>
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 font-bold'>
                  Sign Up
                </button>
              </Link>
            )
          }
          {
            token !== null && (
              <ProfileDropDown/>
            )
          }


        </div>


      </div>
    </div>
  )
}

export default Navbar