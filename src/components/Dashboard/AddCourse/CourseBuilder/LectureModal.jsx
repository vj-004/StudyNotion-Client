import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi";
import CustomButton from '../../../Common/CustomButton';
import Upload from '../Upload';
import { apiConnecter } from '../../../../services/apiConnector';
import { createSubSection, editSubSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../reducers/slices/courseSlice';
import toast from 'react-hot-toast';


const LectureModal = ({setModalData, modalData, add=false, view=false, edit=false}) => {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [videoUrl, setVideoUrl] = useState(null);

    // console.log('modal data', modalData);

    useEffect(() => {
        if (view || edit) {
        // console.log("modalData", modalData)
        setValue("lectureTitle", modalData.title)
        setValue("lectureDescription", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
        }
    }, []);

    const isFormUpdated = () => {

        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||currentValues.lectureDescription !== modalData.description ||currentValues.lectureVideo !== modalData.videoUrl){
            return true;
        }
        return false;
    }

    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("subSectionId", modalData._id);
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDescription !== modalData.description) {
            formData.append("description", currentValues.lectureDescription)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo)
        }

        const result = await editSubSection(formData, token);
        // console.log(result);
        if(result){
            let updatedSection = course.courseContent.find((section) => section._id === modalData.sectionId);
            const updatedSubSections = updatedSection.subSection.map((lecture) =>
                lecture._id === result._id ? result : lecture
            );
            const updatedSectionObj = { ...updatedSection, subSection: updatedSubSections };
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? updatedSectionObj : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            console.log('updatedCOurse', updatedCourse);
            dispatch(setCourse(updatedCourse));
            setModalData(null);
        }
    }

    const onSubmit = async (data) => {

        if(view){
            return;
        }

        if(edit){
            console.log('edit is on');
            if(!isFormUpdated()){
                toast.error("No changes made to the form");
            }
            else{
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        try{

            const result = await createSubSection(formData,token);
            if(!result){
                throw new Error("Result data was null");
            }
            console.log("creating sub section api response", result);
            const updatedCourse = {
                ...course,
                courseContent: course.courseContent.map((section) => section._id === result._id ? result : section)
            };

            dispatch(setCourse(updatedCourse));

        }catch(error){
            console.log('Error in creating the lecture');
        }
        setLoading(false);
        setModalData(null);

    }

  return (
    <div className='bg-richblack-800 w-[40vw] max-h-[80vh] overflow-y-auto rounded-md'>
        <div className='p-2 bg-richblack-700 flex justify-between text-base rounded-md font-inter font-semibold px-6 text-richblack-5'>
            <p>{add && "Adding"} {view && "Viewing"} {edit && "Editing"} Lecture</p>
            <button className='text-2xl text-richblack-100' onClick={() => (!loading ? setModalData(null) : {})}>
                <IoIosClose />
            </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='p-4'>

            <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                errors={errors}
                setValue={setValue}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
            />
            
            <div className='flex flex-col gap-2'>
                <label  className='text-sm font-inter text-richblack-5 mb-2 mt-4' htmlFor='lectureTitle'>Lecture Title<sup className='text-red-500'>*</sup></label>
                <input placeholder='Enter Lecture Title' className='rounded-md w-full bg-richblack-700 p-1 text-richblack-200 font-inter font-medium text-base' 
                    id='lectureTitle'
                    {...register("lectureTitle", {required: true})}
                    disabled={view || loading}
                />        
                {
                    errors.lectureTitle && (
                        <span className='text-red-500 text-xs font-medium font-inter'>* Lecture Title is Required</span>
                    )
                }
            </div>

            <div className='flex flex-col gap-2 mb-2'>
                <label  className='text-sm font-inter text-richblack-5 mb-2 mt-4' htmlFor='lectureDescription'>Lecture Description<sup className='text-red-500'>*</sup></label>
                <textarea placeholder='Enter Lecture Description' className='resize-none rounded-md bg-richblack-700 p-1 text-richblack-200 font-inter font-medium text-base h-[100px]' 
                    id='lectureDescription'
                    {...register("lectureDescription", {required: true})}
                    disabled={view || loading}
                /> 
                {
                    errors.lectureDescription && (
                        <span className='text-red-500 text-xs font-medium font-inter'>* Lecture Description is Required</span>
                    )
                }       
            </div>

            {
                !view && (
                    <div className='w-full flex justify-end p-2'>
                        <div className=''>
                            <button className='py-1 px-3  bg-yellow-50 text-richblack-900 rounded-md font-inter font-medium text-base flex gap-1 justify-center items-center'>
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                )
            }

        </form>
    </div>
    
  )
}

export default LectureModal