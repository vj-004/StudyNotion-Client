import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/Logo/courseX_logo.png';
import { useNavigate } from 'react-router-dom';
import { GrAdd } from "react-icons/gr";
import CreateYtCourseModal from '../components/Common/CreateYtCourseModal';
import { createYtCourse } from '../services/operations/courseDetailsAPI';

const YtCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const ytCourses = user?.ytCourses || [];
    const [createModal, setCreateModal] = useState(null);
    const {token} = useSelector((state) => state.auth );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const progressMap = {};

  console.log('user: ', user);

  for (const courseProgress of user?.ytCourseProgress) {
    progressMap[courseProgress?.playlistUrl] = courseProgress?.isCompleted?.length || 0;
  }


  const handleCreateYtCourse = async (playlistId, playlistName, playlistDescription) => {
    console.log(playlistId, playlistName, playlistDescription);
    const data = {
      playlistURL: playlistId,
      playlistName: playlistName,
      descp: playlistDescription
    }
    // console.log('data: ', data);
    await createYtCourse(data,token,dispatch);
    setCreateModal(null);
  }
    

  return (
    <div className="p-6 w-full min-h-[80vh] flex flex-col items-center">
      <div className="flex flex-col gap-4 w-[90%]">
        <p className="text-sm font-inter text-richblack-300">
          Home / Dashboard / <span className="text-sm font-inter text-yellow-50">YouTube Courses</span>
        </p>

        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-medium font-inter text-richblack-5">YouTube Courses</h1>
          <button
            className="bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 flex justify-center items-center rounded-full shadow-md hover:bg-yellow-50 transition-all duration-200 text-base font-inter mr-10"
            onClick={() => setCreateModal({
                btn1Text: "Create",
                btn2Text: "Close",
                btn1Handler: handleCreateYtCourse,
                btn2Handler: () => setCreateModal(null)
            })} // Add handler if needed
          >
            <span className='flex gap-3 justify-center items-center'><p className='text-md font-semibold font-inter'>Create</p><p className='p-1 bg-richblack-700 rounded-full text-white'><GrAdd /></p></span>
          </button>
        </div>

        <div className="flex flex-col w-full rounded-lg p-1 border-1 border-richblack-700 mt-8">
          <div className="flex w-full justify-between items-center p-2 bg-richblack-700 rounded-t-lg">
            <p className="text-sm font-medium font-inter text-richblack-50 w-[35%] text-center">Course Title</p>
            <p className="text-sm font-medium font-inter text-richblack-50 w-[35%] text-center">Description</p>
            <p className="text-sm font-medium font-inter text-richblack-50 w-[20%] text-center">Progress</p>
          </div>
          {ytCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-lg text-richblack-300">You have not added any YouTube courses yet.</p>
            </div>
          ) : (
            ytCourses.map((course, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full p-4 border-b border-richblack-700 bg-richblack-800 hover:bg-richblack-900 transition-colors duration-200"
                onClick={() => navigate(`/ytcourse/${course.url_id}`)}
              >
                {/* Course Info */}
                <div className="flex items-center gap-4 w-[35%]">
                  <img
                    src={Logo}
                    alt="thumbnail"
                    className="w-64 h-40 p-8 object-cover rounded-lg border border-richblack-600 shadow-sm"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-richblack-5 line-clamp-1">{course.title}</h2>
                  </div>
                </div>

                {/* Description */}
                <div className="w-[35%] flex items-center justify-center text-wrap">
                  <span className="text-sm text-richblack-200 line-clamp-2 text-center">{course.description ?  course.description : 'No Description'}</span>
                </div>

                {/* Progress Bar (Dummy) */}
                <div className="w-[20%] flex flex-col items-center justify-center">
                  <div className="w-full bg-richblack-700 rounded-full h-2 mb-1">
                    <div
                      className="bg-yellow-100 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((progressMap[course.url_id] / course.playlist.video_ids.length) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-richblack-200">{Math.round((progressMap[course.url_id] / course.playlist.video_ids.length) * 100)}% Completed</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {
        createModal && <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slideDown shadow-lg z-40 w-[30%]">
                <CreateYtCourseModal modalData={createModal}/>
            </div>
        </>
    }
    </div>
  );
};

export default YtCourses;