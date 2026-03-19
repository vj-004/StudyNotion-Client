import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

const VideoDeatilsSidebar = () => {

    const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);
    const [openSections, setOpenSections] = useState({});
  const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!courseSectionData?.length) return;

        setOpenSections((prev) => {
            if (sectionId) {
                return {
                ...prev,
                [sectionId]: true,
                };
            }

            if (Object.keys(prev).length > 0) return prev;
            return { [courseSectionData[0]._id]: true };
        });
  }, [courseSectionData, sectionId]);

    const toggleSection = (sectionId) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const isLectureCompleted = (subSectionId) => {
        if (!Array.isArray(completedLectures)) return false;

        return completedLectures.some((item) => {
            if (typeof item === 'string') return item === subSectionId;
            return item?._id === subSectionId || item?.subSectionId === subSectionId;
        });
    };

  return (
    <aside className='flex h-full flex-col bg-richblack-800 text-richblack-5'>
      <div className=' px-4 py-3 items-center flex gap-6 my-2 flex-col'>
        <button className='p-2 text-center bg-richblack-600 rounded-full'
            onClick={() => navigate('/dashboard/enrolled-courses')}
        ><FaChevronLeft /></button>
        <p className='text-lg font-bold text-center uppercase tracking-wide text-richblack-300'>Course Content</p>
      </div>

      <div className='flex-1 overflow-y-auto p-3 border-t border-richblack-700'>
        {courseSectionData?.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {courseSectionData.map((section) => {
              const currentSectionId = section?._id;
              const isOpen = !!openSections[currentSectionId];
              const isActiveSection = currentSectionId === sectionId;

              return (
                <div key={currentSectionId} className='overflow-hidden rounded-md border border-richblack-700 bg-richblack-700'>
                  <button
                    type='button'
                    onClick={() => toggleSection(currentSectionId)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left transition-all duration-200 ${
                      isOpen || isActiveSection
                        ? 'border-l-2 border-l-yellow-50'
                        : 'text-richblack-25 hover:bg-richblack-700'
                    }`}
                  >
                    <span className='text-base font-semibold'>
                      {section?.sectionName || 'Untitled section'}
                    </span>
                    <span className={`font-bold ml-4 transition-transform duration-200 ${isOpen ? 'rotate-90 text-yellow-50' : 'text-richblack-100'}`}>
                      &gt;
                    </span>
                  </button>

                  {isOpen && (
                    <div className='border-t border-richblack-700 bg-richblack-900/40 px-3 py-2'>
                      {section?.subSection?.length > 0 ? (
                        <ul className='space-y-2'>
                          {section.subSection.map((subSection) => {
                            const currentSubSectionId = subSection?._id;
                            const subSectionName = subSection?.title || subSection?.subSectionName || subSection?.name || 'Untitled lecture';
                            const lectureCompleted = isLectureCompleted(currentSubSectionId);
                            const isActiveLecture = currentSubSectionId === subSectionId;

                            return (
                              <li
                                key={currentSubSectionId}
                                className={`flex items-center gap-2 rounded px-2 py-1 ${
                                  isActiveLecture
                                    ? 'border-l-2 border-l-yellow-50 bg-yellow-800 text-yellow-50'
                                    : lectureCompleted
                                      ? 'bg-caribbeangreen-800/20 text-caribbeangreen-25'
                                      : 'text-richblack-50'
                                }`}
                              >
                                <button
                                  type='button'
                                  onClick={() => navigate(`/view-course/${courseId}/section/${currentSectionId}/sub-section/${currentSubSectionId}`)}
                                  className='text-left text-sm my-2'
                                >
                                  {subSectionName}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className='text-xs text-richblack-300'>No lectures in this section.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className='text-sm text-richblack-300'>No sections found.</p>
        )}
      </div>
    </aside>
  )
}

export default VideoDeatilsSidebar