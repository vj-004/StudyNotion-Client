import React, { useState } from 'react'
import { setCourse, setEditCourse, setStep } from '../../../reducers/slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { MdAddCircleOutline } from "react-icons/md";
import CustomButton from '../../Common/CustomButton';
import toast from 'react-hot-toast';
import NestedView from './CourseBuilder/NestedView';
import { createSection, updateSection } from '../../../services/operations/courseDetailsAPI';

const CourseBuilder = () => {

  const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
  const dispatch = useDispatch();
  const {course,editCourse} = useSelector((state) => state.course);
  // editSectionName hold the id of the section name which is going to be edited
  const [editSectionName, setEditSectionName] = useState(null);
  // console.log('editCourse: ', editCourse);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const cancelEdit = () => {
    setEditSectionName(null);
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
    console.log('Creating section');
    if(!editSectionName && data.sectionName !== ""){
      // update section
      const response = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token);
      // console.log('result', result);
      setValue("sectionName", "");
      const updatedCourse = {
        ...course,
        courseContent: [...course.courseContent, response]
      };
      result = updatedCourse;

    }
    else{
      // update the section
      if(data.sectionName === ""){
        toast.error("Section Name cannot be empty");
        return;
      }
      const response = await updateSection({
        sectionId: editSectionName,
        sectionName: data.sectionName,
      }, token);

      const updatedCourse = {
        ...course,
        courseContent: course.courseContent.map(content =>
          content._id === editSectionName
            ? { ...content, sectionName: data.sectionName }
            : content
        )
      };

      result = updatedCourse;

    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
    }

    setLoading(false); 

  }

  const handleEditSectionName = (e,sectionId, sectionName) => {

    e.preventDefault();
    e.stopPropagation();
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
    
  }

  return (
    <div className='text-richblack-5 w-[60%] bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-3 flex flex-col gap-6 relative'>
      <p className='font-semibold font-inter text-2xl'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 p-3'>
        <div className='flex flex-col gap-2 mb-2'>
          <label htmlFor='sectionName'>Section Name<sup className='text-red-500'>*</sup></label>
          <input id="sectionName" className='bg-richblack-700 rounded-md py-2 px-4 text-richblack-5 w-full' placeholder={editSectionName ? 'Edit Section Name' : 'Add a section'} {...register("sectionName",{required: true})}
          />
          {
            errors.sectionName && (<span className='text-sm font-semibold font-inter text-red-500'><sup>*</sup>Section name is required</span>)
          }
        </div>
        <div className='flex'>
          <button type='submit' className='flex gap-2 items-center text-yellow-50 text-base font-inter font-medium border-[1px] border-yellow-50
          rounded-md p-2'>
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <MdAddCircleOutline />
          </button >
          {
            editSectionName && <button type='button' onClick={() => cancelEdit()} className="rounded-md text-richblack-300 text-sm underline ml-5">
              Cancel Edit
            </button>
          }
        </div>
      </form>
      
      {
        course?.courseContent?.length > 0 && (
          <NestedView handleEditSectionName={handleEditSectionName} />
        )
      }

      <div className='flex gap-3 justify-end'>
        <button className='bg-richblack-700 p-2 px-8 rounded-md font-inter font-medium text-base shadow-md shadow-richblack-200' onClick={() => goBack()}>
          Back
        </button>
        <CustomButton active={true} arrow={true} text={"Next"} dest={"#"} onClick={() => goNext()} />
      </div>

    </div>
  )
}

export default CourseBuilder