import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar';

const Dashboard = () => {

    const location = useLocation();

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading){
        return (
            <div className='text-white text-3xl'>
                Loading...
            </div>
        )
    }





  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>

        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
            <div>
                <Outlet />
            </div>
        </div>



    </div>
  )
}

export default Dashboard