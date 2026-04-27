import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/Logo/courseX_logo.png';
import { useNavigate } from 'react-router-dom';
import { GrAdd } from "react-icons/gr";
import { BsFillGrid3X3GapFill, BsListUl } from 'react-icons/bs';
import toast from 'react-hot-toast';
import CreateYtCourseModal from '../components/Common/CreateYtCourseModal';
import YtCourseStatusDot from '../components/Common/YtCourseStatusDot';
import YtCourseCard from '../components/Common/YtCourseCard';
import { createYtCourse, getAllUserYtCourses } from '../services/operations/courseDetailsAPI';
import { ytCourseStatus } from '../constants';
import { updateYtCourseStatus } from '../reducers/slices/profileSlice';

const YtCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const ytCourses = user?.ytCourses || [];
  const [createModal, setCreateModal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const {token} = useSelector((state) => state.auth );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const progressMap = {};
  const hasProcessingCourse = ytCourses.some(
    (course) => course?.status === ytCourseStatus.PROCESSING
  );

  // console.log('user: ', user);

  for (const courseProgress of user?.ytCourseProgress) {
    // progressMap[courseProgress?.playlistUrl] = ((courseProgress?.isCompleted?.length || 0) / (courseProgress?.totalLectures || 1)) || 0;
    // console.log('courseProgress: ', courseProgress);
    progressMap[courseProgress?.playlistUrl] = (courseProgress?.isCompleted && courseProgress?.totalLectures) ? courseProgress?.isCompleted?.length / courseProgress?.totalLectures : 0;
    // console.log('Percentage completed: ', progressMap[courseProgress?.playlistUrl]*100);
  }


  const handleCreateYtCourse = async (playlistId, playlistName, playlistDescription) => {
    console.log(playlistId, playlistName, playlistDescription);
    const data = {
      playlistURL: playlistId,
      playlistName: playlistName,
      descp: playlistDescription
    }
    // console.log('data: ', data);
    await createYtCourse(data,token,dispatch,navigate);
    setCreateModal(null);
  }

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      const updatedYtCourses = await getAllUserYtCourses(token,dispatch, navigate);
      if (!Array.isArray(updatedYtCourses) || !Array.isArray(user?.ytCourses)) {
        return;
      }

      const updatedCoursesMap = new Map(
        updatedYtCourses.map((course) => [course?.url_id, course])
      );

      for (const course of user.ytCourses) {
        const latestCourse = updatedCoursesMap.get(course?.url_id);
        if (!latestCourse) continue;

        if (course?.status !== latestCourse?.status) {
          dispatch(
            updateYtCourseStatus({
              url_id: course?.url_id,
              status: latestCourse?.status,
            })
          );
        }
      }
    } finally {
      setIsRefreshing(false);
    }
  }
    

  return (
    <div className="p-6 w-full min-h-[80vh] flex flex-col items-center">
      <div className="flex flex-col gap-4 w-[90%]">
        <p className="text-sm font-inter text-richblack-300">
          Home / Dashboard / <span className="text-sm font-inter text-yellow-50">YouTube Courses</span>
        </p>

        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-medium font-inter text-richblack-5">YouTube Courses</h1>
          <div className="flex items-center gap-3 mr-10">
            <div className="flex items-center rounded-md border border-richblack-600 bg-richblack-800 p-1">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                title="List view"
                aria-label="Switch to list view"
                className={`rounded-md p-2 transition-colors duration-200 ${viewMode === 'list' ? 'bg-yellow-50 text-richblack-900' : 'text-richblack-200 hover:bg-richblack-700'}`}
              >
                <BsListUl className="text-base" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('block')}
                title="Block view"
                aria-label="Switch to block view"
                className={`rounded-md p-2 transition-colors duration-200 ${viewMode === 'block' ? 'bg-yellow-50 text-richblack-900' : 'text-richblack-200 hover:bg-richblack-700'}`}
              >
                <BsFillGrid3X3GapFill className="text-base" />
              </button>
            </div>
            {hasProcessingCourse && (
              <button
                type="button"
                onClick={() => handleRefresh()}
                disabled={isRefreshing}
                className="rounded-md border border-yellow-100/60 bg-richblack-700 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-yellow-50 hover:bg-richblack-600 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            )}
            <button
              className="bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 flex justify-center items-center rounded-full shadow-md hover:bg-yellow-50 transition-all duration-200 text-base font-inter"
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
        </div>

        {viewMode === 'list' ? (
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
              ytCourses.map((course, index) => {
                const thumbnailUrl = course?.playlistDetails?.thumbnail?.url;
                const isUnavailable =
                  course?.status === ytCourseStatus.FAILED ||
                  course?.status === ytCourseStatus.PROCESSING;

                return (
                <div
                  key={index}
                  className={`flex items-center justify-between w-full p-4 border-b border-richblack-700 bg-richblack-800 transition-colors duration-200 ${isUnavailable ? 'cursor-not-allowed opacity-90' : 'hover:bg-richblack-900 cursor-pointer'}`}
                  onClick={() => {
                    if (isUnavailable) {
                      toast.error(course?.statusMessage || `Course is currently ${String(course?.status || 'unavailable').toLowerCase()}.`);
                      return;
                    }
                    navigate(`/ytcourse/${course.url_id}`)
                  }}
                >
                  {/* Course Info */}
                  <div className="flex items-center gap-4 w-[40%]">
                    <img
                      src={thumbnailUrl ? thumbnailUrl : Logo}
                      alt="thumbnail"
                      width={176}
                      height={110}
                      onError={(e) => {
                        e.currentTarget.src = Logo;
                      }}
                      className="w-[176px] h-[110px] object-cover rounded-md border border-richblack-600 shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-richblack-5 line-clamp-2">{course.title}</h2>

                      {/* Best position for table view: keep status close to title for quick scanning */}
                      <div className="mt-1 flex items-center gap-2">
                        <YtCourseStatusDot
                          status={course?.status || ytCourseStatus.READY}
                          showLabel={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="w-[30%] flex items-center justify-center text-wrap px-2">
                    <span className="text-sm text-richblack-200 line-clamp-2 text-center">{course.description ?  course.description : 'No Description'}</span>
                  </div>

                  {/* Progress Bar (Dummy) */}
                  <div className="w-[20%] flex flex-col items-center justify-center">
                    <div className="w-full bg-richblack-700 rounded-full h-2 mb-1">
                      <div
                        className="bg-yellow-100 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.round(progressMap[course.url_id] * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-richblack-200">{Math.round(progressMap[course.url_id] * 100)}% Completed</span>
                  </div>

                </div>
                )
              })
            )}
          </div>
        ) : (
          <div className="mt-8 w-full rounded-lg border border-richblack-700 bg-richblack-800 p-5 flex justify-center">
            {ytCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <p className="text-lg text-richblack-300">You have not added any YouTube courses yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
                {ytCourses.map((course, index) => {
                  const isUnavailable =
                    course?.status === ytCourseStatus.FAILED ||
                    course?.status === ytCourseStatus.PROCESSING;

                  return (
                    <div key={index} className={`rounded-lg ${isUnavailable ? 'opacity-90' : ''}`}>
                      <YtCourseCard
                        course={course}
                        showStatusLabel={true}
                        className={isUnavailable ? 'cursor-not-allowed' : ''}
                        onClick={() => {
                          if (isUnavailable) {
                            toast.error(course?.statusMessage || `Course is currently ${String(course?.status || 'unavailable').toLowerCase()}.`);
                            return;
                          }
                          navigate(`/ytcourse/${course.url_id}`);
                        }}
                      />
                      <div className='w-[300px] h-1.5 bg-richblack-500 rounded-sm mt-1'>
                        <div
                          className="bg-yellow-100 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.round(progressMap[course.url_id] * 100)}%` }}
                        >

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      {
        createModal && <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-slideDown shadow-lg z-40 w-[30%]">
                <CreateYtCourseModal modalData={createModal}/>
            </div>
        </>
      }
      {isRefreshing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-richblack-600 bg-richblack-800 px-8 py-6">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-richblack-400 border-t-yellow-50"></div>
            <p className="text-sm font-inter text-richblack-5">Refreshing courses...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YtCourses;