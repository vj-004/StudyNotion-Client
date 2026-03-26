import React, { useEffect, useState } from 'react'
import { getAllPlaylistData } from '../../services/operations/courseDetailsAPI';

const CreateYtCourseModal = ({modalData}) => {

    const [playlistId, setPlaylistId] = useState(null);
    const [playlistDescription, setPlaylistDescription] = useState("");
    const [playlistName, setPlaylistName] = useState("");

    const [allPlaylistData, setAllPlaylistData] = useState([]);
    const selectedPlaylistUrl = playlistId
        ? `https://www.youtube.com/playlist?list=${playlistId}`
        : "";

    useEffect(() => {

        const getAllPlaylistDetails = async () => {
            const result = await getAllPlaylistData();
            console.log('result of all playlist data: ', result);
            setAllPlaylistData(result);
        }

        getAllPlaylistDetails();

    }, []);
    // console.log('Function to run when create is clicked',modalData?.btn1Handler)


    return (
        <div className="bg-richblack-900 p-3 rounded-lg border-4 border-richblack-600 w-full mx-auto">
            <div className='flex flex-col gap-2 w-full'>
                {/* <p className="text-4xl font-inter font-semibold text-richblack-5">{modalData.text1}</p>
                <p className="text-base font-inter font-medium text-richblack-500 mb-6">{modalData.text2}</p> */}
                {/* Form to get data for creating course */}
                <form className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="playlistId" className="text-richblack-5 font-inter font-medium">Select Playlist</label>
                        <select
                            id="playlistId"
                            name="playlistId"
                            value={playlistId || ""}
                            onChange={e => setPlaylistId(e.target.value)}
                            className="p-2 rounded-md bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select a playlist</option>
                            {allPlaylistData?.map((playlist) => (
                                <option key={playlist.playlistId} value={playlist.playlistId}>
                                    {playlist.title}
                                </option>
                            ))}
                        </select>
                        {selectedPlaylistUrl && (
                            <a
                                href={selectedPlaylistUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-fit text-sm font-inter font-medium text-yellow-50 hover:underline ml-2"
                            >
                                Visit selected playlist on YouTube
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