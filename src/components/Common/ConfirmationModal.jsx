import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="bg-richblack-900 p-6 rounded-md border-2 border-richblack-600">
        <div className='flex flex-col gap-2'>
            <p className="text-4xl font-inter font-semibold text-richblack-5">{modalData.text1}</p>
            <p className="text-base font-inter font-medium text-richblack-500 mb-6">{modalData.text2}</p>
            <div className='flex gap-6'>
                <button onClick={modalData?.btn1Handler} className="p-2 bg-yellow-50 text-richblack-900 rounded-md font-inter font-bold">
                    {modalData?.btn1Text}
                </button>

                <button onClick={modalData?.btn2Handler} className="bg-richblack-500 p-2 text-richblack-900 rounded-md font-inter font-semibold">
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>

    </div>
  )
}

export default ConfirmationModal