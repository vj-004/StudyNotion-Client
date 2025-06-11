import React from 'react'
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link}) => {

  const Icon = Icons[link.icon];
  const dispatch = useDispatch();
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }



  return (
    <NavLink to={link.path} className={`py-2 flex pl-5 gap-4 items-center ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 border-l-2 border-l-yellow-50" : "bg-opacity-0 text-richblack-300"}`}>
      <div className='flex items-center gap-x-2'>
        <Icon className="text-sm" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink