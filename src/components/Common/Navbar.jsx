import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../Auth/ProfileDropDown';
import { apiConnecter } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { CiCircleChevDown } from "react-icons/ci";


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
          <img src={Logo} width={160} height={32} alt='logo' loading='lazy'/>
        </Link>

        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((link,index) => (
                <li key={index} className='hover:text-richblack-5'>
                  {
                    link.title === 'Catalog' ? (<div className='text-richblack-25 group cursor-pointer relative flex items-center gap-2 justify-center'>
                      
                      <p className='font-semibold'>{link.title}</p>
                      <CiCircleChevDown />
                      <div className='absolute top-[125%] z-10 invisible opacity-0 -left-[200%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                       transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] '>
                        {
                          subLinks.length > 0 ? subLinks.map((obj,index) => (
                            <Link to={`/${obj.name.replace(/\s+/g, '-').toLowerCase()}`} className='flex justify-center items-center' key={index}>
                              {
                                obj.name
                              }
                            </Link>
                          ))
                          :
                          (
                            <div>

                            </div>
                          )
                        }
                        <div className='absolute h-6 w-6 rotate-45 rounded bg-richblack-5 -top-[2%] left-[73%]'>

                        </div>
                      </div>

                    </div>) : (<Link to={link?.path} >
                      <p className={`${matchPath({path:link?.path}, location.pathname) ? "text-yellow-25" : "text-richblack-25 hover:scale-95"} transition-all duration-200 font-semibold`}>{link.title}</p>
                    </Link>)
                  }
                </li>
              ))
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