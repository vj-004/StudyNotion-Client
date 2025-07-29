import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { deleteSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../reducers/slices/courseSlice';
import { FaPlus } from "react-icons/fa";
import LectureModal from './LectureModal';

const NestedView = ( {handleEditSectionName, setConfimationModalData} ) => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const numberOfLectures = course?.courseContent?.length;
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addLecture, setAddLecture] = useState(null);

  const deleteCurrentSection = (sectionId) => {

    const response = deleteSection({sectionId, courseId: course._id}, token);
    
    const updatedCourse = {
      ...course,
      courseContent: course.courseContent.filter((content) => content._id !== sectionId)
    };
    console.log('updated course is: ', updatedCourse);
    dispatch(setCourse(updatedCourse));
    setConfirmationModal(null);

  }


  return (
    <div className='text-richblack-5 ml-3 bg-richblack-700 border border-richblack-600 rounded-md pl-6 py-4 pr-6'>
      <div className='flex flex-col gap-8'>
        {
          course.courseContent.map((section,index) => (
            <details key={section._id} open={false}>
              <summary className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <RxDropdownMenu />
                  <p className='font-inter font-semibold text-richblack-50 text-base'>{section.sectionName}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <MdEdit onClick={(e) => handleEditSectionName(e,section._id, section.sectionName)} className='cursor-pointer' />
                  <MdDelete onClick={(e) => {
                    e.preventDefault();
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn2Handler: () => setConfirmationModal(null),
                      btn1Handler: () => deleteCurrentSection(section._id)
                    })
                  }} className='cursor-pointer'/>
                </div>
              </summary>
              <div className='ml-6'>Hello</div>
              {
                section.subSection.map((data, index) => (
                  <div key={index} className='ml-6'>
                    <div>
                      <RxDropdownMenu/>
                      <p>{data.title}</p>
                    </div>

                    <div>

                    </div>

                  </div>
                ))
              }
              <button onClick={() => {
                setAddLecture(section._id);
              }}>
                <div className='flex gap-1 items-center justify-center mt-2 text-yellow-50 font-inter font-semibold ml-2 '>
                  <FaPlus />
                  <p>Add Lecture</p>
                </div>
              </button>
            </details>
          ))
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

      {
        addLecture && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />

            {/* Modal Wrapper: fills screen and scrolls if needed */}
            <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6">
              <LectureModal
                setModalData={setAddLecture}
                modalData={addLecture}
                add={true}
              />
            </div>
          </>
        )
      }




    </div>
  )
}

export default NestedView