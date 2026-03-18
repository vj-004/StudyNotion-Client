import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllCourseDetails } from '../services/operations/courseDetailsAPI';

const ViewCourse = () => {

    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        const setCourseSpecificDetails = async () => {
            const courseData = await getAllCourseDetails(courseId, token);
            dispatch();
        }

        setCourseSpecificDetails();

    }, []);

  return (
    <div>ViewCourse</div>
  )
}

export default ViewCourse