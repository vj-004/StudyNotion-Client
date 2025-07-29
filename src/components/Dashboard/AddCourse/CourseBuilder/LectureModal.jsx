import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi";
import CustomButton from '../../../Common/CustomButton';
import Upload from '../Upload';
import { apiConnecter } from '../../../../services/apiConnector';
import { createSubSection } from '../../../../services/operations/courseDetailsAPI';


const LectureModal = ({setModalData, modalData, add=false, view=false, edit=false}) => {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [videoUrl, setVideoUrl] = useState(null);

    const onSubmit = async (data) => {


        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("video", data.lectureVideo);
        console.log(getValues("lectureVideo"));
        // console.log(data.lectureVideo instanceof File); // should be true
        setLoading(true);
        try{

            const result = await createSubSection(formData,token);

            if(!result.data.data){
                throw new Error("Result data was null");
            }

            console.log("creating sub section api response", result.data.data);

        }catch(error){
            console.log('Error in creating the lecture');
        }

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
                /> 
                {
                    errors.lectureDescription && (
                        <span className='text-red-500 text-xs font-medium font-inter'>* Lecture Description is Required</span>
                    )
                }       
            </div>

            <div className='w-full flex justify-end p-2'>
                <div className=''>
                    <button className='py-1 px-3  bg-yellow-50 text-richblack-900 rounded-md font-inter font-medium text-base flex gap-1 justify-center items-center'>
                        <p>Save</p>
                    </button>
                </div>
            </div>

        </form>
    </div>
    
  )
}

export default LectureModal