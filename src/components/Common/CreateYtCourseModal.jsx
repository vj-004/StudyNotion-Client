import React, { useEffect, useState } from 'react'

const CreateYtCourseModal = ({modalData}) => {

    const [playlistId, setPlaylistId] = useState(modalData?.initialPlaylistId || "");
    const [playlistDescription, setPlaylistDescription] = useState(modalData?.initialPlaylistDescription || "");
    const [playlistName, setPlaylistName] = useState(modalData?.initialPlaylistName || "");

    useEffect(() => {
        setPlaylistId(modalData?.initialPlaylistId || "");
        setPlaylistName(modalData?.initialPlaylistName || "");
        setPlaylistDescription(modalData?.initialPlaylistDescription || "");
    }, [modalData]);

    const playlistUrl = playlistId
        ? playlistId.startsWith("http")
            ? playlistId
            : `https://www.youtube.com/playlist?list=${playlistId}`
        : null;

    // console.log('Function to run when create is clicked',modalData?.btn1Handler)


    return (
        <div className="bg-richblack-900 p-3 rounded-lg border-4 border-richblack-600 w-full mx-auto">
            <div className='flex flex-col gap-2 w-full'>
                {/* <p className="text-4xl font-inter font-semibold text-richblack-5">{modalData.text1}</p>
                <p className="text-base font-inter font-medium text-richblack-500 mb-6">{modalData.text2}</p> */}
                {/* Form to get data for creating course */}
                <form className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="playlistId" className="text-richblack-5 font-inter font-medium">Playlist ID</label>
                        <input
                            type="text"
                            id="playlistId"
                            name="playlistId"
                            value={playlistId || ""}
                            onChange={e => setPlaylistId(e.target.value)}
                            className={`p-2 rounded-md text-richblack-5 border border-richblack-600 focus:outline-none ${modalData?.lockPlaylistId ? 'bg-richblack-800 cursor-not-allowed' : 'bg-richblack-700'}`}
                            placeholder="Enter YouTube Playlist ID"
                            readOnly={Boolean(modalData?.lockPlaylistId)}
                            required
                        />
                        {playlistUrl && (
                            <a
                                href={playlistUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 w-fit text-xs font-semibold text-yellow-50 underline underline-offset-2 hover:text-yellow-25"
                            >
                                View Playlist
                            </a>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="playlistName" className="text-richblack-5 font-inter font-medium">Playlist Name</label>
                        <input
                            type="text"
                            id="playlistName"
                            name="playlistName"
                            value={playlistName}
                            onChange={e => setPlaylistName(e.target.value)}
                            className="p-2 rounded-md bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none"
                            placeholder="Enter Playlist Name"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="playlistDescription" className="text-richblack-5 font-inter font-medium">Playlist Description</label>
                        <textarea
                            id="playlistDescription"
                            name="playlistDescription"
                            value={playlistDescription}
                            onChange={e => setPlaylistDescription(e.target.value)}
                            className="p-2 rounded-md bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none"
                            placeholder="Enter Playlist Description"
                            rows={3}
                            required
                        />
                    </div>
                </form>
                <div className='flex gap-6'>
                    <button onClick={() => modalData?.btn1Handler(playlistId, playlistName, playlistDescription)} className="p-2 bg-yellow-50 text-richblack-900 rounded-md font-inter font-bold">
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

export default CreateYtCourseModal