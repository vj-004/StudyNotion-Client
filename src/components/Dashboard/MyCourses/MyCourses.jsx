import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { instructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import CourseTable from './CourseTable';
import { IoAddSharp } from "react-icons/io5";

const MyCourses = () => {

  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {

    const getInstructorCourses = async () => {

      setLoading(true);
      try{
        const result = await instructorCourses();
        setCourses(result);
      }
      catch(error){
        console.log('Error in getting all instructor courses');
      }
      setLoading(false);
    }
    getInstructorCourses();
  }, []);

  return (
    <div className=' p-6 w-full'>
      <div className='text-richblack-5 flex justify-between w-[98%]'>
        <h1 className='text-3xl font-inter font-medium text-richblack-5'>My Courses</h1>
        <button className='bg-yellow-50 text-richblack-800 rounded-md p-2 font-inter font-medium' onClick={() => {
          navigate('/dashboard/add-course');
        }}><span className='flex gap-2 justify-between items-center '><IoAddSharp className='font-inter font-bold' /> Add Course</span></button>
      </div>

        {courses && <CourseTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourses