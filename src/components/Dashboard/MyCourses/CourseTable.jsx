import React, { useState } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FiLock, FiUnlock } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import ConfirmationModal from '../../Common/ConfirmationModal';
import { deleteCourse } from '../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CourseTable = ({courses, setCourses}) => {

  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteCurrentCourse = async (courseId) => {
    await deleteCourse(courseId, token, dispatch, navigate);
    setConfirmationModal(null);
    const updatedCourses = courses.filter((course) => course._id !== courseId);
    setCourses(updatedCourses);
  }


  return (
    <div className='p-6 mt-8 ml-10 bg-richblack-800 rounded-xl shadow-lg mr-10'>
      {
        courses.length>0 && (
          <div className='text-richblack-5 flex gap-2 w-[100%] font-inter font-medium text-lg mb-4'>
            <div className='w-[50%] flex justify-start pl-4'>
              Courses
            </div>
            <div className='w-[25%] flex justify-center'>
              Price
            </div>
            <div className='w-[25%] flex justify-center'>
              Actions
            </div>
          </div>
        )
      }
      <div className='text-richblack-5 flex gap-2 w-[100%] flex-col mt-2'>
        {
        courses.length === 0 ? (
          <div className='flex flex-col items-center justify-center mt-10 w-full bg-richblack-700 rounded-lg py-10'>
            <div className='text-richblack-5 text-2xl font-bold font-inter mb-2'>
              No Courses Found
            </div>
            <div className='text-richblack-200 text-base font-inter'>
              You haven&apos;t created any courses yet. Start by adding a new course!
            </div>
          </div>
        ) : 
        (
          courses?.map((course) => (
            <div
              key={course._id}
              className='flex gap-2 w-full py-4 border-b border-richblack-600 items-center hover:bg-richblack-700 transition-colors duration-150 relative'
              style={{ minHeight: "150px" }}
            >
              <div className='w-[50%] flex pl-4'>
                <img
                  className='h-[150px] w-[220px] rounded-lg object-cover border border-richblack-400 shadow'
                  src={course?.thumbnail}
                  alt={course?.courseName}
                />
                <div className='flex flex-col gap-2 ml-6'>
                  <div className='flex flex-col justify-between ml-6 h-full w-full'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-lg font-semibold font-inter'>{course?.courseName.substring(0,30)} ...</p>
                      <p className='text-sm font-inter text-richblack-200'>{course.courseDescription.substring(0,75)}...</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 mt-2 ${
                        course.status === "Public"
                          ? "bg-blue-600 text-white"
                          : course.status === "Private"
                          ? "bg-red-600 text-white"
                          : course.status === "Draft"
                          ? "bg-yellow-500 text-white"
                          : "bg-richblack-600 text-white"
                      }`}
                      style={{ display: "inline-flex", width: "fit-content" }}
                    >
                      {course.status === "Private" && <FiLock size={14} className="text-white" />}
                      {course.status === "Public" && <FiUnlock size={14} className="text-white" />}
                      {course.status === "Draft" && <MdOutlineTimer size={15} className="text-white" />}
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className='w-[25%] flex justify-center items-center'>
                <span className='font-bold text-lg'>
                  {Number(course?.price) === 0 ? "Free" : `₹${course?.price}`}
                </span>
              </div>
              <div className='w-[25%] flex justify-center items-center gap-2'>
                <button
                  className='p-2 rounded hover:bg-richblack-700 transition-colors duration-150 flex items-center'
                  onClick={() => {
                    navigate(`/dashboard/edit-course/${course._id}`);
                  }}
                  title="Edit Course"
                >
                  <FiEdit2 size={18} className="text-richblack-300" />
                </button>
                <button
                  className='p-2 rounded hover:bg-richblack-700 transition-colors duration-150 flex items-center'
                  onClick={() => {setConfirmationModal({
                    text1: "Delete this course",
                    text2: "This will delete all the videos in the lecture",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn2Handler: () => setConfirmationModal(null),
                    btn1Handler: () => deleteCurrentCourse(course._id)
                  })}}
                  title="Delete Course"
                >
                  <MdDeleteOutline size={20} className="text-richblack-300" />
                </button>
              </div>
            </div>
          ))
        )
      }
      </div>

      {confirmationModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />

          {/* Modal Container */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center animate-slideDown">
            <ConfirmationModal modalData={confirmationModal} />
          </div>
        </>
      )}

    </div>
  )
}

export default CourseTable