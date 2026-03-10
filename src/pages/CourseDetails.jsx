import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
// import { buyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    // console.log('user: ',user);
    const handleBuyCourse = async () => {
        console.log('courseid: ', courseId);
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
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