import React, { useState } from 'react'
import { setCourse, setEditCourse, setStep } from '../../../reducers/slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { MdAddCircleOutline } from "react-icons/md";
import CustomButton from '../../Common/CustomButton';
import toast from 'react-hot-toast';

const CourseBuilder = () => {

  const {register, handleSubmit, setValue, getVAlues, formState: {errors}} = useForm();
  const dispatch = useDispatch();
  const {course,editCourse} = useSelector((state) => state.course);
  // editSectionName hold the id of the section name which is going to be edited
  const [editSectionName, setEditSectionName] = useState(null);
  // console.log('editCourse: ', editCourse);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  const goNext  = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add one section and one lecture in each to proceed");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please create a lecture for each section");
      return;
    }
    dispatch(setStep(3));

  }

  const goBack  = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      // update section
    }
    else{
      // create the section
    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
    }

    setLoading(false);

  }

  const handleEditSectionName = (sectionId, sectionName) => {

    if(editSectionName == sectionName){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='text-richblack-5'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section Name<sup>*</sup></label>
          <input id="sectionName" placeholder='Add section name' {...register("sectionName",{required: true})}
            className='w-full'
          />
          {
            errors.sectionName && (<span>Section name is required</span>)
          }
        </div>
        <div>
          <button type='button' className='flex gap-1 items-center'>
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <MdAddCircleOutline />
          </button>
          {
            editSectionName && <button type='button' onClick={() => cancelEdit()}>
              Cancel Edit
            </button>
          }
        </div>
      </form>
      
      {
        course.courseContent.length > 0 && (
          <NestedView handleEditSectionName={handleEditSectionName} />
        )
      }

      <div>
        <button onClick={() => goBack()}>
          Back
        </button>
        <CustomButton active={true} arrow={true} text={"Next"} dest={"#"} onClick={() => goNext()} />
      </div>


    </div>
  )
}

export default CourseBuilder