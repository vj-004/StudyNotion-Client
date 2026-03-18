import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { markCourseAsComplete } from '../services/operations/courseDetailsAPI';
import { IoIosCheckmarkCircle } from "react-icons/io";

const YtCourse = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { ytPlaylistId } = useParams();
    const [ytCourse, setYtCourse] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [ytCourseProgress, setYtCourseProgress] = useState([]);
    const lectureItemRefs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(!ytPlaylistId){
        toast.error("There is not course with this id");
        navigate('/dashboard');
    }

    


    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        const getYtCourse = () => {
            for (const course of user.ytCourses) {
                if (course.url_id === ytPlaylistId) {
                    setYtCourse(course);
                    break;
                }
            }

            for(const courseProgress of user.ytCourseProgress){
                if(courseProgress.playlistUrl === ytPlaylistId){
                    setYtCourseProgress(courseProgress);
                    break;
                }
            }
        };
        getYtCourse();
    }, [user, token, user?.ytCourses, ytPlaylistId, navigate]);

    
    const videoIds = useMemo(() => {
        return ytCourse?.playlist?.video_ids || [];
    }, [ytCourse?.playlist?.video_ids]);
    
    const currentVideoId = videoIds[selectedIdx];
    const isFirstLecture = selectedIdx === 0;
    const isLastLecture = selectedIdx === videoIds.length - 1;
    const isCurrentLectureCompleted = ytCourseProgress?.isCompleted?.includes(currentVideoId) || false;

    useEffect(() => {

        const firstVideoIdx = () => {
            if (!ytCourseProgress || !videoIds) return;

            let start = 0;
            let end = videoIds.length - 1;
            let idx = 0;

            while (start <= end) {
                const mid = Math.floor((start + end) / 2);

                if (ytCourseProgress?.isCompleted?.includes(videoIds[mid])) {
                    start = mid + 1;
                } else {
                    idx = mid;
                    end = mid - 1;
                }
            }

            setSelectedIdx(idx);
        }

        firstVideoIdx();
        
    }, [ytCourseProgress, videoIds]);

    useEffect(() => {
        const activeLectureBtn = lectureItemRefs.current[selectedIdx];
        if (!activeLectureBtn) return;

        activeLectureBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    }, [selectedIdx, videoIds.length]);
    
    if (!ytCourse || !ytCourseProgress) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <p className="text-2xl text-richblack-300 font-semibold">No such YouTube course found.</p>
            </div>
        );
    }
    

    // console.log(user);

    const handlePrev = () => {
        if (!isFirstLecture) {
            setSelectedIdx((prevIdx) => prevIdx - 1);
        }
    };

    const handleNext = () => {
        if (!isLastLecture) {
            setSelectedIdx((prevIdx) => prevIdx + 1);
        }
    };

    const handleToggleComplete = async () => {

        if (!currentVideoId) return;
        if(!ytCourseProgress.isCompleted.includes(currentVideoId)){
            
            const result = await markCourseAsComplete({videoId: currentVideoId, playlistUrl: ytPlaylistId}, token, dispatch);

            if(!result) return;

            // setYtCourseProgress((prev) =>(
            //     {
            //         ...prev,
            //         isCompleted: [...prev.isCompleted, currentVideoId]
            //     }
            // ));
            setSelectedIdx((prevIdx) => prevIdx + 1);

        }
        
    };

    return (
        <div className="flex flex-col overflow-y-hidden w-full h-full bg-richblack-900">
            
            <div className="flex flex-row justify-between h-[calc(100vh_-_56px)]">
                {/* Main: Video Player */}
                <div className="flex flex-col justify-start items-center  w-full h-full overflow-hidden">
                    <h1 className="text-2xl md:text-3xl font-bold text-yellow-50 text-center mt-4">{ytCourse.title}</h1>
                    <main className="flex flex-col items-center p-8 animate-slidein-up w-[100%] h-fit">
                    
                        <div className="w-full max-w-[1800px] min-h-[420px] aspect-[16/8] rounded-xl overflow-hidden shadow-2xl border border-yellow-50 animate-fadein">
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
                    <div className="w-full px-4 md:px-10 pb-6">
                        <div className="mx-auto w-full rounded-xl border border-richblack-700 bg-richblack-800/70 px-4 py-4 md:px-6 backdrop-blur-sm shadow-lg">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <button
                                        onClick={handlePrev}
                                        disabled={isFirstLecture}
                                        className="rounded-lg border border-richblack-600 bg-richblack-700 px-5 py-2.5 text-sm font-semibold text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100 hover:bg-richblack-600 hover:text-yellow-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        disabled={isLastLecture}
                                        className="rounded-lg bg-yellow-50 px-5 py-2.5 text-sm font-semibold text-richblack-900 shadow-[0_6px_18px_rgba(255,214,10,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-25 hover:shadow-[0_10px_24px_rgba(255,214,10,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>

                                <button
                                    onClick={handleToggleComplete}
                                    className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all duration-200 md:min-w-[190px]
                                        ${isCurrentLectureCompleted
                                            ? 'border-caribbeangreen-300 bg-caribbeangreen-800 text-caribbeangreen-25 hover:bg-caribbeangreen-700'
                                            : 'border-pink-300 bg-pink-900 text-pink-25 hover:bg-pink-800'
                                        }`}
                                >
                                    {isCurrentLectureCompleted ? 'Completed' : 'Mark as Completed'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar: Lectures List */}
                <aside className="w-[14%] min-w-64 bg-richblack-800 p-3 flex flex-col gap-2 border-r border-richblack-700 shadow-lg h-full ">
                    <h2 className="text-xl font-bold text-yellow-50 mb-4 self-start ml-4">
                        Lectures
                    </h2>

                    <div className="flex flex-col gap-2 self-center w-full overflow-y-auto overflow-x-hidden pr-5">
                        {videoIds.length === 0 ? (
                            <p className="text-richblack-300">No lectures found.</p>
                        ) : (
                            videoIds.map((vid, idx) => (
                                <button
                                    key={vid || idx}
                                    ref={(el) => {
                                        lectureItemRefs.current[idx] = el;
                                    }}
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
                                        {
                                            ytCourseProgress && ytCourseProgress.isCompleted.includes(vid) && (
                                                <span className='text-3xl text-green-600 bg-white rounded-full'><IoIosCheckmarkCircle /></span>
                                            )
                                        }
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