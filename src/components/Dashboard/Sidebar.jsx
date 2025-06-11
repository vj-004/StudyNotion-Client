import React, { useState } from 'react'

import { sidebarLinks } from '../../data/dashboard-links';
import { logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../Common/ConfirmationModal';

const Sidebar = () => {

    const {user,loading: profileLoading} = useSelector((state) => state.profile)
    const {loading: authLoading} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return (
            <div className='text-white text-3xl'>
                Loading...
            </div>
        )
    }


  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

        <div className='flex flex-col gap-1'>
            {
                sidebarLinks.map((link) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return (
                            <SidebarLink link={link} key={link.id}/>
                        )
                    }
                    
                )
            }
        </div>

        <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'>

        </div>

        <div className='flex flex-col gap-1'>
            <SidebarLink link={{name: "Settings", path: "/dashboard/settings", id: 7, icon: "VscSettingsGear"}}/>
            
            <button onClick={() => {
                setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Close",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                })
            }}
            className='font-medium text-richblack-300 py-2 flex pl-5 gap-4 items-center'>
                <div className='flex items-center gap-x-2'>
                    <VscSignOut/>
                    Logout
                </div>
            </button>

        </div>

        {
            confirmationModal && <>
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slideDown shadow-lg z-40">
                    <ConfirmationModal modalData={confirmationModal}/>
                </div>
            </>
        }

    </div>
  )
}

export default Sidebar