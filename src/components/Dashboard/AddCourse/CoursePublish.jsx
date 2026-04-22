import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setCourse, setStep } from '../../../reducers/slices/courseSlice';
import { editCourseDetails } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CoursePublish = () => {

  const {register, handleSubmit, getValues} = useForm({
    defaultValues:{
      courseStatus: "Private"
    }
  });
  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const goBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses");
  }

  const handleCoursePublish = async () => {
    if((course?.status === "Public" && getValues("public") === true) || 
      (course?.status === "Private" && getValues("public") === false)){
        goToCourses();
        return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("courseStatus");
    console.log('course Status1',courseStatus);
    formData.append("status", courseStatus);
    try{
      setLoading(true);
      // console.log('trying to edit course');
      const response = await editCourseDetails(formData, dispatch, navigate);
      // console.log('response', response);
      if(response){
        toast.success("Course added successfully");
        setLoading(false);
        navigate('/dashboard/my-courses');
        dispatch(setStep(1));
        dispatch(setCourse(null));

      }
      else{
        toast.error("Publishing unsuccessful. Please login again");
      }

    }catch(error){
      console.log('Error in publishing course');
    }
    setLoading(false);

  }

  const onSubmit = () => {
    handleCoursePublish();
  }


  return (
    <div className='rounded-md w-[60%] border-[1px] bg-richblack-800 p-6 border-richblack-700 text-richblack-5'>
      <p className='font-inter font-semibold text-2xl'>Publish Settings</p>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex gap-4 flex-col mt-10 ml-4'>
          <p>Mark this course as: </p>
          <label className='ml-8'>
            <input type='radio' value="Public" {...register("courseStatus")}/>
            <span className='ml-2'>Public</span>
          </label>
          <label className='ml-8'>
            <input type='radio' value="Private" {...register("courseStatus")}/>
            <span className='ml-2'>Private</span>
          </label>
        </div>


        <div className='flex justify-end gap-4 w-full mt-10'>
          <button disabled={loading} className='bg-richblack-700 p-2 px-4 rounded-md font-inter font-medium text-base shadow-md shadow-richblack-200'
          onClick={() => goBack()}>
            Back
          </button>
          <button className='px-4 py-2  bg-yellow-50 text-richblack-900 rounded-md font-inter font-medium text-base flex gap-1 justify-center items-center shadow-md shadow-richblack-200'>
            Publish
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default CoursePublish