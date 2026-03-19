import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const VideoDetails = () => {

  const { courseEntireData, courseSectionData } = useSelector((state) => state.viewCourse);
    const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();

  const flatLectures = useMemo(() => {
    if (!Array.isArray(courseSectionData)) return [];

    return courseSectionData.flatMap((section) =>
      (section?.subSection || []).map((subSection) => ({
        sectionId: section?._id,
        sectionName: section?.sectionName,
        subSection,
      }))
    );
  }, [courseSectionData]);

  const currentLectureIndex = flatLectures.findIndex(
    (item) => item.sectionId === sectionId && item?.subSection?._id === subSectionId
  );

  const currentLecture = currentLectureIndex >= 0 ? flatLectures[currentLectureIndex] : null;
  const currentSubSection = currentLecture?.subSection || null;

  const instructor = courseEntireData?.instructor;
  const instructorName = [instructor?.firstName, instructor?.lastName].filter(Boolean).join(' ');

  const isYoutubeVideo =
    typeof currentSubSection?.videoUrl === 'string' &&
    (currentSubSection.videoUrl.includes('youtube.com') || currentSubSection.videoUrl.includes('youtu.be'));

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';

    const shortUrlMatch = url.match(/youtu\.be\/([^?&/]+)/);
    if (shortUrlMatch?.[1]) return `https://www.youtube.com/embed/${shortUrlMatch[1]}`;

    const longUrlMatch = url.match(/[?&]v=([^?&/]+)/);
    if (longUrlMatch?.[1]) return `https://www.youtube.com/embed/${longUrlMatch[1]}`;

    return '';
  };

  const youtubeEmbedUrl = isYoutubeVideo ? getYoutubeEmbedUrl(currentSubSection?.videoUrl) : currentSubSection?.videoUrl;

  const handleNavigateLecture = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= flatLectures.length) return;

    const targetLecture = flatLectures[targetIndex];
    navigate(`/view-course/${courseId}/section/${targetLecture.sectionId}/sub-section/${targetLecture.subSection._id}`);
  };

  if (!courseEntireData || !Array.isArray(courseSectionData) || courseSectionData.length === 0) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <p className='text-lg font-semibold text-richblack-100'>Loading lecture details...</p>
      </div>
    );
  }

  if (!currentSubSection) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
        <p className='text-lg font-semibold text-richblack-100'>Lecture not found for this URL.</p>
        <button
          type='button'
          onClick={() => {
            const firstLecture = flatLectures[0];
            if (!firstLecture) return;
            navigate(`/view-course/${courseId}/section/${firstLecture.sectionId}/sub-section/${firstLecture.subSection._id}`);
          }}
          className='rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900'
        >
          Go to first lecture
        </button>
      </div>
    );
  }

  return (
  <div className='w-full text-richblack-5'>
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-5'>
      <div className='lg:col-span-4'>
        <div className='overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-lg'>
          <div className='aspect-video w-full bg-richblack-900'>
            {youtubeEmbedUrl ? (
              <iframe
                title={currentSubSection?.title || 'Lecture video'}
                src={youtubeEmbedUrl}
                className='h-full w-full'
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <div className='h-full w-full' />
            )}
          </div>

          <div className='space-y-3 p-5'>
            <p className='text-xs font-semibold uppercase tracking-wide text-yellow-50'>
              {currentLecture?.sectionName}
            </p>
            <h1 className='text-2xl font-bold text-richblack-5'>
              {currentSubSection?.title || 'Untitled lecture'}
            </h1>
            <p className='text-sm leading-6 text-richblack-100'>
              {currentSubSection?.description || 'No lecture description available.'}
            </p>

            <div className='flex flex-wrap gap-3 pt-2'>
              <button
                type='button'
                disabled={currentLectureIndex <= 0}
                onClick={() => handleNavigateLecture(currentLectureIndex - 1)}
                className='flex items-center gap-2 rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-sm font-semibold text-richblack-5 transition-all duration-200 hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <FaChevronLeft />
                Previous
              </button>
              <button
                type='button'
                disabled={currentLectureIndex === flatLectures.length - 1}
                onClick={() => handleNavigateLecture(currentLectureIndex + 1)}
                className='flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-25 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:col-span-1'>
        <div className='flex flex-col gap-4'>
          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
            <p className='text-xs font-semibold uppercase tracking-wide text-richblack-300'>Course</p>
            <h2 className='mt-2 text-xl font-semibold text-richblack-5'>{courseEntireData?.courseName}</h2>
            <p className='mt-3 text-sm leading-6 text-richblack-100'>
              {courseEntireData?.courseDescription || 'No course description available.'}
            </p>
          </div>

          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
            <p className='text-xs font-semibold uppercase tracking-wide text-richblack-300'>Instructor</p>

            <div className='mt-4 flex items-center gap-3'>
              <img
                src={instructor?.image}
                alt={instructorName || 'Instructor'}
                className='h-14 w-14 rounded-full border border-richblack-600 object-cover'
              />
              <div>
                <p className='text-base font-semibold text-richblack-5'>
                  {instructorName || 'Instructor'}
                </p>
                <p className='text-xs text-richblack-300'>Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default VideoDetails