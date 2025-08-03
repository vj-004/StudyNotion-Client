import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseDetailsAPI';
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
  const [viewLecture, setViewLecture] = useState(null);
  const [editLecture, setEditLecture] = useState(null);

  // console.log('course', course);

  const deleteCurrentSubSection = (subSectionId, sectionId) => {

    try{
      const response = deleteSubSection({subSectionId, sectionId}, token);
      // Find the section object to update
      const sectionToUpdate = course.courseContent.find((content) => content._id === sectionId);
      if (!sectionToUpdate) {
        setConfirmationModal(null);
        return;
      }

      // Remove the subSection by id
      const updatedSection = {
        ...sectionToUpdate,
        subSection: sectionToUpdate.subSection.filter((sub) => sub._id !== subSectionId)
      };

      const updatedCourse = {
        ...course,
        courseContent: course.courseContent.map((content) =>
          content._id !== sectionId ? content : updatedSection
        )
      };
      dispatch(setCourse(updatedCourse));
      setConfirmationModal(null);
    } catch(error){
      console.log('Error in deleting sub section');
    }
    

  }

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
      <div className='flex flex-col gap-4'>
        {
          course && course.courseContent && course.courseContent.map((section,index) => (
            <details key={section._id} open={false}>
              <summary className='flex justify-between cursor-pointer'>
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
              <div className='w-full bg-richblack-500 h-[1px] mt-1'></div>
              {
                section?.subSection?.map((subSection, index) => (
                  <div key={index} className='ml-6 mt-2 w-[95%]'>
                    <div className='flex justify-between items-center'>
                      <div className='flex gap-2 items-center cursor-pointer' onClick={() => {
                        setViewLecture(subSection);
                        setAddLecture(null);
                      }}>
                        <RxDropdownMenu/>
                        <p>{subSection.title}</p>
                      </div>

                      <div className='flex gap-2'>
                        <MdEdit className='cursor-pointer' onClick={() => {
                          setViewLecture(null);
                          setAddLecture(null);
                          setEditLecture({
                            ...subSection,
                            sectionId: section._id
                          });
                        }} />
                        <MdDelete onClick={(e) => {
                          e.preventDefault();
                          setConfirmationModal({
                            text1: "Delete this lecture",
                            text2: "This lecture will be deleted from the section",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn2Handler: () => setConfirmationModal(null),
                            btn1Handler: () => deleteCurrentSubSection(subSection._id,section._id)
                          })
                        }} className='cursor-pointer'/>
                      </div>
                    </div>
                    <div className='w-full bg-richblack-500 h-[0.5px] mt-1'></div>
                  </div>
                ))
              }
              <button onClick={() => {
                setViewLecture(null);
                setEditLecture(null);
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

      {
        viewLecture && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />

            {/* Modal Wrapper: fills screen and scrolls if needed */}
            <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6">
              <LectureModal
                setModalData={setViewLecture}
                modalData={viewLecture}
                add={false}
                view={true}
              />
            </div>
          </>
        )
      }

      {
        editLecture && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />

            {/* Modal Wrapper: fills screen and scrolls if needed */}
            <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6">
              <LectureModal
                setModalData={setEditLecture}
                modalData={editLecture}
                add={false}
                view={false}
                edit={true}
              />
            </div>
          </>
        )
      }




    </div>
  )
}

export default NestedView