import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { TbCoinRupeeFilled } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import { addCourseDetails, editCourseDetails, fetchAllCategories, getDraftCourse } from '../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../reducers/slices/courseSlice';
import { FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

// image not rendering when we are editing course

const CourseInfo = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState:{errors}
    } = useForm();
    const {course,editCourse} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const [courseTags, setCourseTags] = useState([]);
    const [tag, setTag] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        
        const getAllCategories = async () => {
            setLoading(true);
            const categories = await fetchAllCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        register("courseTags",{
            required: true
        });
        register("courseRequirements",{
            required: true
        });
        getAllCategories();
    }, []);

    useEffect(() => {
        if(editCourse && course){
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
            setRequirementList(course.instructions);
            setCourseTags(course.tag);
            setPreviewUrl(course.thumbnail);
        }
    }, [course]);

    useEffect(() => {
        setValue("courseTags", courseTags);
    }, [courseTags]);

    useEffect(() => {
        setValue("courseRequirements", requirementList);
    }, [requirementList]);

    const handleRemoveTag = (tag) => {
        console.log('Removing tag: ', tag);
        setCourseTags(courseTags.filter(element => element!==tag));

    }

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList,requirement.toLowerCase()]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (deleteRequirement) => {
        if(deleteRequirement){
            setRequirementList(requirementList.filter(element => element !== deleteRequirement));
        }
    }

    const isFormUpdated = () => {
        const currvalues = getValues();
        if(currvalues.courseTitle !== course.courseName || currvalues.courseDescription !== course.courseDescription || currvalues.coursePrice !== course.price
            || currvalues.courseTags.toString() !== course.tag.toString() ||
            currvalues.courseBenefits !== course.whatYouWillLearn ||
            currvalues.courseCategory !== course.category ||
            currvalues.courseRequirements.toString() !== course.instructions.toString() ||
            currvalues.courseImage !== course.thumbnail
        ) return true;


        return false;
    }

    const onSubmit = async (data) => {
        if(editCourse && isFormUpdated()){
            const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseDescription !== course.courseDescription){
                formData.append("courseDescription", data.courseDescription);
            }
            if(currentValues.coursePrice !== course.price){
                formData.append("price", data.coursePrice);
            }
            if(currentValues.courseTags.toString() !== course.tag.toString()){
                formData.append("tag", data.courseTags);
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn){
                formData.append("whatYouWillLearn", data.courseBenefits);
            }
            if(currentValues.courseCategory !== course.category){
                formData.append("category", data.courseCategory);
            }
            if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                formData.append("instructions",data.courseRequirements);
            }
            if(currentValues.courseImage !== course.thumbnail){
                formData.append("thumbnail", data.courseImage);
            }
            setLoading(true);
            try{

                const result = await editCourseDetails(formData);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                    dispatch(setEditCourse(false));
                }
                else{
                    dispatch(setStep(2));
                    toast.error("No changes made to the form");
                }
                dispatch(setStep(2));
                
            }catch(error){
                console.log('Error in editing course...', error);
            }
            setLoading(false);
            dispatch(setEditCourse(false));
            return;
        }

        if(!editCourse){
            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseDescription);
            formData.append("price", data.coursePrice);
            formData.append("tag", data.courseTags);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append("instructions", data.courseRequirements);
            formData.append("thumbnail", data.courseImage[0]);
            formData.append("status", "Draft");

            setLoading(true);
            
            try{
                const result = await addCourseDetails(formData, token);
                if(result){
                    setPreviewUrl(result.thumbnail);
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
                console.log('Course added successfully');
            }catch(error){
                console.log('Error in creating new course..', error);
            }
            setLoading(false);
            return;
        }

        setLoading(true);
        dispatch(setStep(2));
        setLoading(false);  
    }

  return (
    <form className='rounded-md bg-richblack-800 border-1 border-richblack-700 p-3 w-full  lg:w-[60%]' onSubmit={handleSubmit(onSubmit, (err) => {
        console.log("❌ Validation Errors:", err);
        })}>

        {/* Course title */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='courseTitle' className='text-sm font-inter text-richblack-5 mb-2'>Course Title<sup className='text-red-500'>*</sup></label>
            <input type='text' id='courseTitle' className='bg-richblack-700 rounded-md py-2 px-4 text-richblack-5' placeholder='Enter Course Title' 
                {...register("courseTitle",{required: true})}
            />
            {
                errors.courseTitle && (
                    <span className='text-red-500 text-xs font-medium font-inter'>* Course Title is Required</span>
                )
            }
        </div>
            {/* Course description */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='courseDescription' className='text-sm font-inter text-richblack-5 mb-2'>Course Short Description<sup className='text-red-500'>*</sup></label>
            <textarea type='text' id='courseDescription' className='bg-richblack-700 rounded-md py-2 px-4 text-richblack-5 h-36' placeholder='Enter Course Title' 
                {...register("courseDescription",{required: true})}
            />
            {
                errors.courseDescription && (
                    <span className='text-red-500 text-xs font-medium font-inter'>* Course Description is Required</span>
                )
            }
        </div>
            {/* Course price */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='coursePrice' className='text-sm font-inter text-richblack-5 mb-2'>Course Price<sup className='text-red-500'>*</sup></label>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center w-full relative'>
                    <p className='text-richblack-500 text-2xl absolute left-2'><TbCoinRupeeFilled/></p>
                    <input type='number' id='coursePrice' className='bg-richblack-700 rounded-md w-full py-2 pl-10 pr-2 text-richblack-5' placeholder='Enter Course Price'
                        {...register("coursePrice",{required: true})}
                    />
                </div>

                {
                    errors.coursePrice && (
                        <span className='text-red-500 text-xs font-medium font-inter'>* Course Price is Required</span>
                    )
                }

            </div>
        </div>
                {/* Course Category */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='courseCategory' className='text-sm font-inter text-richblack-5 mb-2'>Course Category<sup className='text-red-500'>*</sup></label>
            <select id='courseCategory' className='bg-richblack-700 rounded-md px-4 py-2 text-richblack-5' defaultValue=''
             {...register("courseCategory",{required: true})}
            >   
                <option value='' disabled>Select a Category</option>
                <option value='no-category'>No Categories</option>
                {
                    !loading && courseCategories.map((category,index) => (
                        <option key={index} value={category?._id}>{category.name}</option>
                    ))
                }
            </select>
            {
                errors.coursePrice && (
                    <span className='text-red-500 text-xs font-medium font-inter'>* Course Category is Required</span>
                )
            }
        </div>
        
            {/* Course tags */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='courseTags' className='text-sm font-inter text-richblack-5 mb-2'>Tags<sup className='text-red-500'>*</sup></label>
            <div className='w-full flex flex-wrap gap-2'>
                {
                    courseTags.map((tag,index) => (
                        <div key={index} className='flex bg-yellow-300 gap-2 py-1 px-2 rounded-md justify-center items-center hover:scale-95 transition-all duration-200'>
                            <p className=' text-richblack-5 font-inter font-medium'>{tag.toLowerCase()}</p>
                            <p className='text-xs text-richblack-5 font-bold '
                                onClick = {() => handleRemoveTag(tag)}
                            ><RxCross1 /></p>
                        </div>
                    ))
                }
            </div>
            <input type='text' id='courseTags' className='bg-richblack-700 mt-1 rounded-md py-2 px-4 text-richblack-5 ' placeholder='Enter a Tag' 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <p className='rounded-md cursor-pointer w-fit p-2 bg-yellow-50 text-richblack-900 mt-2 px-6 hover:scale-95 transition-all font-inter font-medium duration-200' onClick={() => {
                if(tag){
                    setCourseTags([...courseTags, tag]);
                    setTag("");
                }
            }}>Add</p>

        </div>
        
        {/* Adding thumbnail */}
        <div className='flex flex-col gap-1 p-2'>

            <p className='text-sm font-inter text-richblack-5 mb-2'>Course Thumbnail<sup className='text-red-500'>*</sup></p>
            <label htmlFor='courseImage' className='h-48 bg-richblack-700 rounded-md border-1 border-richblack-600 cursor-pointer'>
                <div className='flex flex-col justify-center items-center h-full'>
                    {
                        !previewUrl ? (
                            <>
                                <div className='w-fit h-fit p-2 rounded-full bg-pure-greys-800 '>
                                    <FiUploadCloud className='text-yellow-50' />
                                </div>
                                <p className='text-xs font-inter text-richblack-200 mt-5'>Drag and drop an image, or <span className='text-yellow-50'>Browse</span><br/>
                                    Max 6MB each (12MB for videos)</p>

                                <div className='text-xs text-richblack-200 font-inter flex gap-10 mt-5'>
                                    <p>Aspect ratio 16:9</p>
                                    <p>Recommended size 1024x576</p>
                                </div>
                            </>
                        )
                        :
                        (
                            <img src={previewUrl} alt='preview' loading='lazy' className= 'overflow-hidden object-cover' />
                        )
                    }
                </div>
            </label>
            <input
                type="file"
                id="courseImage"
                accept="image/*"
                {...register("courseImage", { required: !editCourse})}
                className='hidden'
            />
        </div>
        
        {/* Course Benefits */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='courseBenefits' className='text-sm font-inter text-richblack-5 mb-2'>Course Benefits<sup className='text-red-500'>*</sup></label>
            <textarea type='text' id='courseBenefits' className='bg-richblack-700 rounded-md py-2 px-4 text-richblack-5 h-36' placeholder='Enter Course Benefits' 
                {...register("courseBenefits",{required: true})}
            />
            {
                errors.courseBenefits && (
                    <span className='text-red-500 text-xs font-medium font-inter'>* Course Benefits is Required</span>
                )
            }
        </div>

        {/* If same requirements are trying to be added, handle a check for that */}
        {/* Requirements of course */}
        <div className='flex flex-col gap-1 p-2'>
            <label htmlFor='requirement' className='text-sm font-inter text-richblack-5 mb-2'>Course Requirements<sup className='text-red-500'>*</sup></label>
            <div className='flex flex-wrap gap-2 mb-2'>
                <ul className='gap-2 flex flex-wrap'>
                    {
                        requirementList.length > 0 && requirementList.map((task,index) => (
                            <li key={index} className="flex items-center gap-4 bg-richblack-800 px-4 py-2 rounded-md shadow-sm border border-richblack-600">
                                <span className="text-sm font-medium text-richblack-100 break-words">
                                    {task}
                                </span>
                                <p
                                    onClick={() => handleRemoveRequirement(task)}
                                    className=" cursor-pointertext-sm font-semibold text-richblack-900 bg-yellow-50 hover:bg-yellow-100 transition-colors px-3 py-1 rounded-md shadow"
                                >
                                    Clear
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <input type='text' id='requirement' className='bg-richblack-700 rounded-md py-2 px-4 text-richblack-5' placeholder='Enter Course Requirement' 
                value={requirement} onChange={(e) => setRequirement(e.target.value)}
            />
            {
                errors.courseRequirements && (
                    <span className='text-red-500 text-xs font-medium font-inter'>* Course Requirements is Required</span>
                )
            }
            <p className='rounded-md cursor-pointer w-fit p-2 bg-yellow-50 text-richblack-900 mt-2 px-6 hover:scale-95 transition-all duration-200 font-inter font-medium' 
                onClick={() => handleAddRequirement(requirement)}
            >
                Add
            </p>
            
        </div>
        
        {/* final buttons for course info page */}
        <div className='w-full flex justify-end p-2'>
            <div className=''>
                <button className='py-1 px-3  bg-yellow-50 text-richblack-900 rounded-md font-inter font-medium text-base flex gap-1 justify-center items-center'>
                    <p>{editCourse ? "Save Changes" : "Next"}</p>
                    <FaChevronRight className='text-sm'/>
                </button>
            </div>
        </div>
    </form>
  )
}

export default CourseInfo