import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { GrMoney } from "react-icons/gr";
import { IoCartSharp } from "react-icons/io5";
import { getAllCourseDetails } from '../services/operations/courseDetailsAPI';
import { MdOutlineArrowForward } from "react-icons/md";
import toast from 'react-hot-toast';
import { addToCart } from '../reducers/slices/cartSlice';
// import { buyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [isCourseBought, setIsCourseBought] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // console.log('user: ', user);

    useEffect(() => {

        const getCourseDetail = async () => {
            if(user){
                for(const  crs of user?.courses) {
                    if(crs._id === courseId){
                        setCourse(crs);
                        setIsCourseBought(true);
                        return;
                    }
                }
            }

            const crs = await getAllCourseDetails(courseId);
            if(crs){
                setCourse(crs?.courseDetails);
            }
        }
        getCourseDetail();

    }, [courseId, user?.courses, user]);

    const handleAddtoCart = async () => {

        if(!user || !token){
            toast.error("Please login to continue");
            return;
        }

        if(user && user.accountType === 'instructor'){
            toast.error("You are not allowed to buy a course");
            return;
        }

        if(token && course){
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please login as a Student to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=> setConfirmationModal(null),
        })


    }

    const handleBuyCourse = async () => {

        if(!user || !token){
            toast.error("Please login to continue");
            return;
        }
        
        if(user && user.accountType === 'instructor'){
            toast.error("You are not allowed to buy a course");
            return;
        }
        
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please login as a Student to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

    if (!course) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <p className="text-2xl text-richblack-300 font-semibold">No such course available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto py-12 px-6 w-full">
            

            {/* Left: Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">
                {/* Title & Instructor */}
                <div>
                    <h1 className="text-3xl font-bold text-richblack-5 mb-2">{course.courseName}</h1>
                    <p className="text-base text-richblack-300 mb-1">by <span className="font-semibold text-yellow-50">{`${course?.instructor?.firstName} ${course?.instructor?.lastName}` || "Unknown Instructor"}</span></p>
                    {/* Reviews & Students Enrolled */}
                    <div className="flex gap-6 mt-2 mb-2">
                        {/* <div className="flex items-center gap-1">
                            <span className="text-richblack-200 text-lg"><span className='text-yellow-50 font-bold'>{Array.isArray(course.ratingsAndReviews) ? course.ratingsAndReviews.length : 0}</span> Reviews</span>
                        </div> */}
                        <div className="flex items-center gap-1">
                            <span className="text-richblack-200 text-lg"><span className='text-yellow-50 font-bold'>{Array.isArray(course.studentsEnrolled) ? course.studentsEnrolled.length : 0}</span> Students Enrolled</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {Array.isArray(course.tag) && course.tag.length > 0 ? (
                        course.tag.map((tag, idx) => (
                            <span key={idx} className="bg-yellow-900 text-yellow-50 px-2 py-1 rounded text-xs font-medium">{tag}</span>
                        ))
                    ) : (
                        <span className="text-xs text-richblack-400">No tags</span>
                    )}
                </div>

                {/* Description */}
                <p className="text-richblack-200 text-lg mb-2">{course.courseDescription}</p>

                {/* What you'll learn */}
                <div className="mb-2">
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">What you'll learn</h2>
                    <p className="text-richblack-200 text-md">{course.whatYouWillLearn || "No details provided."}</p>
                </div>



                {/* Instructions */}
                <div className="mb-2">
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">Instructions</h2>
                    {Array.isArray(course.instructions) && course.instructions.length > 0 ? (
                        <ul className="list-disc list-inside text-richblack-200 text-md pl-4">
                            {course.instructions.map((instruction, idx) => (
                                <li key={idx} className='text-md'>{instruction}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-richblack-200 text-md">No instructions provided.</p>
                    )}
                </div>

                {/* Course Content */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">Course Content</h2>
                    {Array.isArray(course?.courseContent) && course.courseContent.length > 0 ? (
                        <div className="mt-2 flex flex-col gap-3">
                            {course.courseContent.map((section, idx) => {
                                const lectureCount = Array.isArray(section?.subSection) ? section.subSection.length : 0;

                                return (
                                    <div
                                        key={section?._id || idx}
                                        className="rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold text-richblack-5">
                                                Section {idx + 1}: {section?.sectionName || "Untitled Section"}
                                            </p>
                                            <p className="text-xs text-richblack-300">
                                                {lectureCount} {lectureCount === 1 ? "Lecture" : "Lectures"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-richblack-200 text-md">No content available for now.</p>
                    )}
                </div>

            </div>
            
            {/* Right: Thumbnail & Actions */}
            <div className="w-[30%] flex flex-col items-center gap-6 bg-richblack-800 p-6 h-fit rounded-md">
                <img
                    src={course.thumbnail || "/default-course.png"}
                    alt={course.courseName}
                    className="rounded-xl shadow-lg w-full max-w-xs object-cover border border-richblack-700"
                />
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    {
                        !isCourseBought ? (
                            <>
                                <span className='font-bold text-richblack-5 mb-2 px-1 text-3xl font-inter'>Rs. {course.price}</span>

                                <button
                                className="bg-richblack-700 text-center w-full rounded-2xl h-14 relative text-richblack-5 text-xl font-semibold border-4 border-richblack-700 group"
                                onClick={() => handleBuyCourse()}
                                >
                                <div
                                    className="bg-yellow-50 rounded-xl h-12 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500"
                                >
                                <span className='text-richblack-800'><GrMoney /></span>    
                                </div>
                                <p className="translate-x-4">Buy Now</p>
                                </button>


                                <button
                                type="button"
                                className="bg-richblack-700 text-center w-full rounded-2xl h-14 relative text-richblack-5 text-xl font-semibold border-4 border-richblack-700 group"
                                >
                                <div
                                    className="bg-yellow-50 rounded-xl h-12 w-1/4 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500"
                                    onClick={() => handleAddtoCart()}
                                >
                                <span className='text-richblack-800'><IoCartSharp /></span>    
                                </div>
                                <p className="-translate-x-4">Add to Cart</p>
                                </button>
                            </>
                        ) :
                        (
                            <>
                                <button
                                type="button"
                                className="bg-richblack-700 text-center w-full rounded-2xl h-14 relative text-richblack-5 text-xl font-semibold border-4 border-richblack-700 group"
                                onClick={() => navigate('/dashboard/enrolled-courses')}
                                >
                                <div
                                    className="bg-yellow-50 rounded-xl h-12 w-1/4 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500"
                                >
                                <span className='text-richblack-800'><MdOutlineArrowForward /></span>    
                                </div>
                                <p className="-translate-x-4">Go To Course</p>
                                </button>
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default CourseDetails