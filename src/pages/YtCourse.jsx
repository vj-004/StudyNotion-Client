import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const YtCourse = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { ytCourseId } = useParams();
    const [ytCourse, setYtCourse] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const navigate = useNavigate();

    if(!ytCourseId){
        toast.error("There is not course with this id");
        navigate('/dashboard');
    }

    console.log('courseid: ', ytCourseId);

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        const getYtCourse = () => {
            for (const course of user.ytCourses) {
                console.log('user course id: ', course._id);
                if (course._id === ytCourseId) {
                    setYtCourse(course);
                    return;
                }
            }
        };
        getYtCourse();
    }, [user, token, user?.ytCourses, ytCourseId, navigate]);

    if (!ytCourse) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <p className="text-2xl text-richblack-300 font-semibold">No such YouTube course found.</p>
            </div>
        );
    }

    const videoIds = ytCourse.playlist?.video_ids || [];
    const currentVideoId = videoIds[selectedIdx];

    return (
        <div className="flex flex-col overflow-y-hidden w-full h-full bg-richblack-900">
            
            {/* <h1 className="text-2xl md:text-3xl font-bold text-yellow-50 mb-4 text-center">{ytCourse.title}</h1> */}
            <div className="flex flex-row justify-between h-[calc(100vh_-_56px)]">
                {/* Main: Video Player */}
                <div className="flex flex-col justify-center items-center  w-full h-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-yellow-50 text-center mt-4">{ytCourse.title}</h1>
                    <main className="flex flex-col items-center p-8 animate-slidein-up w-[100%] h-full">
                    
                        <div className="w-full min-h-[420px] aspect-[16/8] rounded-xl overflow-hidden shadow-2xl border border-yellow-50 animate-fadein">
                            {currentVideoId ? (
                                <iframe
                                    key={currentVideoId}
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${currentVideoId}?rel=0`}
                                    title={`Lecture ${selectedIdx + 1}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full transition-all duration-500"
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full w-full bg-richblack-700">
                                    <p className="text-lg text-richblack-300">Select a lecture to play</p>
                                </div>
                            )}
                        </div>
                        

                    </main>
                </div>

                {/* Sidebar: Lectures List */}
                <aside className="w-[14%] bg-richblack-800 p-3 flex flex-col gap-2 border-r border-richblack-700 shadow-lg h-full ">
                    <h2 className="text-xl font-bold text-yellow-50 mb-4 self-center">
                        Lectures
                    </h2>

                    <div className="flex flex-col gap-2 self-center w-full overflow-y-auto overflow-x-hidden pr-5">
                        {videoIds.length === 0 ? (
                            <p className="text-richblack-300">No lectures found.</p>
                        ) : (
                            videoIds.map((vid, idx) => (
                                <button
                                    key={vid || idx}
                                    onClick={() => setSelectedIdx(idx)}
                                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 text-left font-inter text-base group
                                    ${selectedIdx === idx
                                        ? 'bg-yellow-50 text-richblack-900 font-bold scale-105 shadow-md'
                                        : 'bg-richblack-700 text-richblack-100 hover:bg-yellow-900 hover:text-yellow-50'
                                    }`}
                                >
                                    <span className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg border-2 transition-all duration-300
                                    ${selectedIdx === idx
                                        ? 'bg-yellow-100 border-yellow-400 text-richblack-900'
                                        : 'bg-richblack-900 border-richblack-600 text-yellow-50'
                                    }`}>
                                        
                                    </span>

                                    <span className="truncate">Lecture {idx + 1}</span>
                                </button>
                            ))
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default YtCourse;