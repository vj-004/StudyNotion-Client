import React, { useEffect, useState } from 'react'
import RenderSteps from '../renderSteps'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllCourseDetails } from '../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../reducers/slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getAllCourseDetails(courseId);
            console.log('result: ', result);
            dispatch(setEditCourse(true));
            dispatch(setCourse(result));
            setLoading(false);
        }

        populateCourseDetails();

    }, [courseId, dispatch]);
    

  return (
    <div className='p-6 w-full'>
        <div className='text-richblack-5 flex justify-between w-[98%]'>
            <h1 className='text-3xl font-inter font-medium text-richblack-5'>Edit Course</h1>
        </div>

        <div className='p-6 w-full'>
            <RenderSteps />
        </div>
    </div>
  )
}

export default EditCourse