import React from 'react'
import { useSelector } from 'react-redux';
// import { buyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);

    const handleBuyCourse = async () => {

        if(token){
            // buyCourse();
            return;
        }

    }

  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <button className='bg-yellow-50 text-richblack-800 text-xl p-6 rounded-lg'
            onClick={() => handleBuyCourse()}
        >
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails