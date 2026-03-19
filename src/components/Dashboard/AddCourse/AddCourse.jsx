import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse, setStep } from '../../../reducers/slices/courseSlice'
import { getDraftCourse } from '../../../services/operations/courseDetailsAPI'
import RenderSteps from '../renderSteps'


const AddCourse = () => {

    // const {step} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchDraftCourse = async () => {
            const courseToBeEdited = await getDraftCourse(navigate,dispatch);
            if(courseToBeEdited){
                dispatch(setEditCourse(true));
                dispatch(setCourse(courseToBeEdited));
                dispatch(setStep(2));
            }
            else{
                dispatch(setEditCourse(false));
                dispatch(setCourse(null));
                dispatch(setStep(1));
            }
            
        }
        fetchDraftCourse();
    }, [dispatch, navigate]);
    
  return (
    <div className='p-6 w-full relative flex flex-col sm:justify-center sm:gap-6'>

        <div className='flex-flex-col gap-4'>
            <Link to={'/dashboard/my-profile'} className='text-sm font-inter text-richblack-300 font-medium'> {"<"} Back to Profile</Link>
        </div>

        <ul className='justify-center lg:absolute lg:top-5 lg:right-10 text-xs font-medium font-inter text-richblack-5 pl-10 py-4 pr-2  marker:text-richblack-5 list-disc list-outside bg-richblack-800 border-2 w-[384px] border-richblack-700 rounded-md flex flex-col gap-4'>
            <h1 className='text-lg'>⚡Course Upload Tips</h1>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
        </ul>

        <div className='p-6 w-full'>
            <RenderSteps />
        </div>
    </div>
  )
}

export default AddCourse