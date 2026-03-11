import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { GrMoney } from "react-icons/gr";
import { IoCartSharp } from "react-icons/io5";
// import { buyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {

        const getCourseDetail = async () => {
            for(const  crs of user.courses) {
                if(crs._id === courseId){
                    setCourse(crs);
                    return;
                }
            }

        }

        getCourseDetail();

    }, [courseId, user.courses]);
    // console.log('user: ',user);
    const handleBuyCourse = async () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

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
            {/* Left: Thumbnail & Actions */}
            <div className="w-[30%] flex flex-col items-center gap-6 bg-richblack-800 p-6 h-fit rounded-md">
                <img
                    src={course.thumbnail || "/default-course.png"}
                    alt={course.courseName}
                    className="rounded-xl shadow-lg w-full max-w-xs object-cover border border-richblack-700"
                />
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <span className='font-bold text-richblack-5 mb-2 px-1 text-3xl font-inter'>Rs. {course.price}</span>

                    <button
                    type="button"
                    class="bg-richblack-700 text-center w-full rounded-2xl h-14 relative text-richblack-5 text-xl font-semibold border-4 border-richblack-700 group"
                    onClick={() => handleBuyCourse}
                    >
                    <div
                        class="bg-yellow-50 rounded-xl h-12 w-1/4 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500"
                    >
                    <span className='text-richblack-800'><GrMoney /></span>    
                    </div>
                    <p class="translate-x-4">Buy Now</p>
                    </button>


                    <button
                    type="button"
                    class="bg-richblack-700 text-center w-full rounded-2xl h-14 relative text-richblack-5 text-xl font-semibold border-4 border-richblack-700 group"
                    >
                    <div
                        class="bg-yellow-50 rounded-xl h-12 w-1/4 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500"
                    >
                    <span className='text-richblack-800'><IoCartSharp /></span>    
                    </div>
                    <p class="-translate-x-4">Add to Cart</p>
                    </button>
                </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">
                {/* Title & Instructor */}
                <div>
                    <h1 className="text-3xl font-bold text-richblack-5 mb-2">{course.courseName}</h1>
                    <p className="text-base text-richblack-300 mb-1">by <span className="font-semibold text-yellow-50">{course.instructor || "Unknown Instructor"}</span></p>
                    {/* Reviews & Students Enrolled */}
                    <div className="flex gap-6 mt-2 mb-2">
                        <div className="flex items-center gap-1">
                            <span className="text-richblack-200 text-lg"><span className='text-yellow-50 font-bold'>{Array.isArray(course.ratingsAndReviews) ? course.ratingsAndReviews.length : 0}</span> Reviews</span>
                        </div>
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
                    <p className="text-richblack-200 text-md">{course.instructions || "No instructions provided."}</p>
                </div>

                {/* Course Content */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">Course Content</h2>
                    <p className="text-richblack-200 text-md">No content available for now.</p>
                </div>

            </div>
        </div>
    );
}

export default CourseDetails