import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getAllCourseDetails } from '../services/operations/courseDetailsAPI';
import VideoDeatilsSidebar from '../components/ViewCourse/VideoDeatilsSidebar';
import { setCourseSectionData, setEntireCourseData } from '../reducers/slices/viewCourseSlice';

const ViewCourse = () => {

    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        const setCourseSpecificDetails = async () => {
            const courseData = await getAllCourseDetails(courseId, token);
            // console.log('courseData: ', courseData);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails)); 
        }

        setCourseSpecificDetails();

    }, [courseId, token, dispatch]);

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] w-full bg-richblack-900 text-richblack-5'>
      <div className='h-[calc(100vh-3.5rem)] w-[280px] shrink-0 border-r border-richblack-700 bg-richblack-800'>
        <VideoDeatilsSidebar/>
      </div>

      <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-y-auto'>
        <div className='w-full px-2 py-3 md:px-3 md:py-4 lg:px-4'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default ViewCourse