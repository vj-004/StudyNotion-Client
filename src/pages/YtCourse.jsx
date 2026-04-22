import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getYtCourseById, markCourseAsComplete } from '../services/operations/courseDetailsAPI';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { updateCoursePlaylist } from '../reducers/slices/profileSlice';
import { TbPlayerPause } from "react-icons/tb";
import { TbPlayerPlay } from "react-icons/tb";
import { MdForward5 } from "react-icons/md";
import { SlSpeedometer } from "react-icons/sl";

const YtCourse = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { ytPlaylistId } = useParams();
    const [ytCourse, setYtCourse] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [ytCourseProgress, setYtCourseProgress] = useState({ isCompleted: [] });
    const [openSections, setOpenSections] = useState({});
    const lectureItemRefs = useRef([]);
    const ytPlayerRef = useRef(null);
    const ytPlayerInstanceRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [isPlayerApiReady, setIsPlayerApiReady] = useState(false);
    const [isVideoPaused, setIsVideoPaused] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1);

    const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    useEffect(() => {
        if (!ytPlaylistId) {
            toast.error("There is no course with this id");
            navigate('/dashboard');
        }
    }, [ytPlaylistId, navigate]);



    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }

        if (!ytPlaylistId) {
            return;
        }
    }, [user, token, user?.ytCourses, ytPlaylistId, navigate, dispatch]);

    useEffect(() => {
        const getYtCourse = async () => {
            setLoading(true);
            for (const course of user?.ytCourses || []) {
                if (course.url_id === ytPlaylistId) {         
                    // console.log('ytCourse: ', course);     

                    if(course.playlist === null){
                        const playlist = await getYtCourseById(ytPlaylistId, dispatch, navigate);
                        const updatedCourse = {
                            ...course,
                            playlist
                        };
                        dispatch(updateCoursePlaylist({ytPlaylistId, playlist}));
                        setYtCourse(updatedCourse);
                        break;
                    }
                    else{
                        setYtCourse(course);
                    }
                }
            }

            for (const courseProgress of user?.ytCourseProgress || []) {
                if (courseProgress.playlistUrl === ytPlaylistId) {
                    setYtCourseProgress(courseProgress);
                    break;
                }
            }
            setLoading(false)
        };

        getYtCourse();
    }, [dispatch, user?.ytCourses, user?.ytCourseProgress, ytPlaylistId, navigate]);

    const sidebarSections = useMemo(() => {
        const playlistData = ytCourse?.playlist || ytCourse || {};
        const courseSections = playlistData?.section || [];
        const detailsByVideoId = new Map(
            (playlistData?.videosDetails || []).map((video) => [video.videoId, video])
        );

        let globalIdx = 0;

        return courseSections.map((section, sectionIdx) => {
            const lectures = (section?.videoIds || []).map((videoId, idxInSection) => {
                const details = detailsByVideoId.get(videoId) || {};
                const lecture = {
                    globalIdx,
                    videoId,
                    sectionIdx,
                    sectionTitle: section?.title || `Section ${sectionIdx + 1}`,
                    idxInSection,
                    title: details?.title || `Lecture ${globalIdx + 1}`,
                    description: details?.description || details?.descripiton || '',
                };

                globalIdx += 1;
                return lecture;
            });

            return {
                sectionIdx,
                title: section?.title || `Section ${sectionIdx + 1}`,
                lectures,
            };
        });
    }, [ytCourse]);

    const lectureList = useMemo(() => {
        return sidebarSections.flatMap((section) => section.lectures);
    }, [sidebarSections]);

    useEffect(() => {
        const nextOpenSections = {};

        sidebarSections.forEach((section) => {
            const key = String(section.sectionIdx);
            nextOpenSections[key] = false;
        });
        setOpenSections(nextOpenSections);
    }, [sidebarSections]);

    useEffect(() => {
        const activeSectionIdx = lectureList[selectedIdx]?.sectionIdx;
        if (activeSectionIdx === undefined) return;

        const activeKey = String(activeSectionIdx);

        setOpenSections((prevOpenSections) => {
            const nextOpenSections = {};
            let didChange = !(activeKey in prevOpenSections) || prevOpenSections[activeKey] !== true;

            Object.keys(prevOpenSections).forEach((key) => {
                const shouldBeOpen = key === activeKey;
                nextOpenSections[key] = shouldBeOpen;
                if (prevOpenSections[key] !== shouldBeOpen) {
                    didChange = true;
                }
            });

            if (!(activeKey in nextOpenSections)) {
                nextOpenSections[activeKey] = true;
                didChange = true;
            }

            return didChange ? nextOpenSections : prevOpenSections;
        });
    }, [lectureList, selectedIdx]);

    const videoIds = useMemo(() => {
        return lectureList.map((lecture) => lecture.videoId);
    }, [lectureList]);

    const currentLecture = lectureList[selectedIdx] || null;
    const currentVideoId = currentLecture?.videoId;
    const isFirstLecture = selectedIdx === 0;
    const isLastLecture = selectedIdx === videoIds.length - 1;
    const isCurrentLectureCompleted = ytCourseProgress?.isCompleted?.includes(currentVideoId) || false;

    useEffect(() => {
        if (window.YT && window.YT.Player) {
            setIsPlayerApiReady(true);
            return;
        }

        const previousReadyHandler = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previousReadyHandler === 'function') {
                previousReadyHandler();
            }
            setIsPlayerApiReady(true);
        };

        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (!existingScript) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
        }
    }, []);

    useEffect(() => {
        if (!isPlayerApiReady || !currentVideoId || !ytPlayerRef.current) {
            return;
        }

        if (ytPlayerInstanceRef.current && typeof ytPlayerInstanceRef.current.destroy === 'function') {
            ytPlayerInstanceRef.current.destroy();
            ytPlayerInstanceRef.current = null;
        }

        ytPlayerInstanceRef.current = new window.YT.Player(ytPlayerRef.current, {
            videoId: currentVideoId,
            playerVars: {
                rel: 0,
            },
            events: {
                onReady: () => {
                    setIsVideoPaused(true);
                    if (playbackRate !== 1) {
                        ytPlayerInstanceRef.current.setPlaybackRate(playbackRate);
                    }
                },
                onStateChange: (event) => {
                    const playerState = window.YT.PlayerState;
                    if (event.data === playerState.PAUSED || event.data === playerState.ENDED) {
                        setIsVideoPaused(true);
                    }
                    if (event.data === playerState.PLAYING || event.data === playerState.BUFFERING) {
                        setIsVideoPaused(false);
                    }
                },
                onPlaybackRateChange: (event) => {
                    setPlaybackRate(event.data);
                },
            },
        });

        return () => {
            if (ytPlayerInstanceRef.current && typeof ytPlayerInstanceRef.current.destroy === 'function') {
                ytPlayerInstanceRef.current.destroy();
                ytPlayerInstanceRef.current = null;
            }
        };
    }, [isPlayerApiReady, currentVideoId]);

    useEffect(() => {
        const firstVideoIdx = () => {
            if (!videoIds.length) return;

            const idx = videoIds.findIndex((videoId) => !ytCourseProgress?.isCompleted?.includes(videoId));

            if (idx === -1) {
                setSelectedIdx(0);
                return;
            }
            setSelectedIdx(idx);
        };

        firstVideoIdx();
    }, []);

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

    const checkChangeSection = (change) => {

        const currentSection = lectureList[selectedIdx]?.sectionIdx;
        const newSection = lectureList[selectedIdx+change]?.sectionIdx;
        if(newSection !== currentSection){
            setOpenSections((prev) => ({
                ...prev,
                [String(newSection)]: true,
                [String(currentSection)]: false,
            }));
        }
    }
    

    // console.log(user);

    const handlePrev = () => {
        if (!isFirstLecture) {
            checkChangeSection(-1);
            setSelectedIdx((prevIdx) => prevIdx - 1);
        }
    };

    const handleNext = () => {
        if (!isLastLecture) {
            checkChangeSection(1);
            setSelectedIdx((prevIdx) => prevIdx + 1);

        }
    };

    const handleToggleComplete = async () => {

        if (!currentVideoId) return;
        if (!ytCourseProgress?.isCompleted?.includes(currentVideoId)) {
            const result = await markCourseAsComplete({ videoId: currentVideoId, playlistUrl: ytPlaylistId }, token, dispatch, navigate);

            if (!result) return;

            // setYtCourseProgress((prev) =>(
            //     {
            //         ...prev,
            //         isCompleted: [...prev.isCompleted, currentVideoId]
            //     }
            // ));
            if (!isLastLecture) {
                checkChangeSection(1);
                setSelectedIdx((prevIdx) => prevIdx + 1);
                
            }

        }

    };

    const handleToggleSection = (sectionIdx) => {
        const key = String(sectionIdx);

        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [key]: !prevOpenSections[key],
        }));
    };

    const handleTogglePlayback = () => {
        if (!ytPlayerInstanceRef.current) return;

        if (isVideoPaused) {
            ytPlayerInstanceRef.current.playVideo();
            return;
        }

        ytPlayerInstanceRef.current.pauseVideo();
    };

    const handleSeekBy = (seconds) => {
        if (!ytPlayerInstanceRef.current) return;

        const currentTime = ytPlayerInstanceRef.current.getCurrentTime();
        const duration = ytPlayerInstanceRef.current.getDuration();
        const nextTime = Math.min(Math.max(currentTime + seconds, 0), duration || Infinity);

        ytPlayerInstanceRef.current.seekTo(nextTime, true);
    };

    const handleChangePlaybackRate = (event) => {
        const nextRate = Number(event.target.value);
        setPlaybackRate(nextRate);

        if (!ytPlayerInstanceRef.current) return;
        ytPlayerInstanceRef.current.setPlaybackRate(nextRate);
    };

    if (loading) {
        return (
            <div className="relative flex w-full flex-col overflow-y-hidden bg-richblack-900">
                <div className="flex h-[calc(100vh_-_56px)] flex-row justify-between">
                    <aside className="w-[14%] min-w-[360px] bg-richblack-800 p-3 flex flex-col gap-4 border-r border-richblack-700 shadow-lg h-full">
                        <button
                            onClick={() => navigate('/dashboard/ytcourses')}
                            className="ml-2 inline-flex w-fit items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100/50 hover:bg-richblack-600 hover:text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2 focus:ring-offset-richblack-800"
                            aria-label="Back to YouTube courses"
                            title="Back to YouTube courses"
                        >
                            <FaChevronLeft className="text-[11px]" />
                            <span>Back</span>
                        </button>
                        <div className="animate-pulse">
                        <div className="mt-4 h-6 w-5/6 self-center rounded bg-richblack-700/90" />
                        <div className="mt-3 flex-1 space-y-3 overflow-hidden pr-2">
                            <div className="h-11 w-full rounded-lg bg-richblack-700/80" />
                            <div className="h-11 w-[92%] rounded-lg bg-richblack-700/70 ml-3" />
                            <div className="h-11 w-[92%] rounded-lg bg-richblack-700/70 ml-3" />
                            <div className="h-11 w-full rounded-lg bg-richblack-700/80" />
                            <div className="h-11 w-[92%] rounded-lg bg-richblack-700/70 ml-3" />
                            <div className="h-11 w-[92%] rounded-lg bg-richblack-700/70 ml-3" />
                        </div>
                        </div>
                    </aside>

                    <div className="relative flex flex-col justify-start items-center w-full h-full overflow-hidden">
                        <div className="w-full h-full overflow-y-auto pb-[92px] animate-pulse">
                            <main className="flex flex-col items-center p-8 w-[100%] min-h-fit">
                                <div className="w-full max-w-[1800px] min-h-[420px] aspect-[16/8] rounded-xl border border-richblack-600 bg-richblack-800/70" />
                                <div className="mt-5 w-full max-w-[1800px] rounded-lg border border-richblack-700 bg-richblack-800/70 px-5 py-4">
                                    <div className="h-3 w-32 rounded bg-richblack-600/90" />
                                    <div className="mt-3 h-6 w-3/5 rounded bg-richblack-600/90" />
                                    <div className="mt-4 space-y-2">
                                        <div className="h-3 w-full rounded bg-richblack-600/80" />
                                        <div className="h-3 w-[94%] rounded bg-richblack-600/80" />
                                        <div className="h-3 w-[88%] rounded bg-richblack-600/80" />
                                    </div>
                                </div>
                            </main>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 z-40 w-full">
                            <div className="mx-auto w-full rounded-t-2xl border-t border-richblack-600 bg-richblack-800/95 px-4 py-4 md:px-6 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-pulse">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="h-10 w-28 rounded-lg bg-richblack-700/90" />
                                        <div className="h-10 w-20 rounded-lg bg-yellow-100/70" />
                                    </div>
                                    <div className="h-10 w-full rounded-lg bg-richblack-700/90 md:w-48" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex w-full flex-col overflow-y-hidden bg-richblack-900">
            
            <div className="flex flex-row justify-between h-[calc(100vh_-_56px)]">
                
                 {/* Sidebar: Lectures List */}
                <aside className="w-[14%] min-w-[360px] bg-richblack-800 p-3 flex flex-col gap-2 border-r border-richblack-700 shadow-lg h-full ">
                    <button
                        onClick={() => navigate('/dashboard/ytcourses')}
                        className="ml-2 inline-flex w-fit items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100/50 hover:bg-richblack-600 hover:text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2 focus:ring-offset-richblack-800"
                        aria-label="Back to YouTube courses"
                        title="Back to YouTube courses"
                    >
                        <FaChevronLeft className="text-[11px]" />
                        <span>Back</span>
                    </button>
                    <h1 className="mx-auto mt-8 text-xl text-wrap font-bold text-yellow-50 mb-10" title={ytCourse.title}>
                        {ytCourse.title}
                    </h1>
                    {/* <h2 className="text-lg font-semibold text-richblack-5 mb-4 ml-4 self-center">
                        Lectures
                    </h2> */}

                    <div className="flex flex-col gap-4 pl-4 w-full overflow-y-auto overflow-x-hidden pr-5">
                        {lectureList.length === 0 ? (
                            <p className="text-richblack-300">No lectures found.</p>
                        ) : (
                            sidebarSections.map((section) => (
                                <div key={`${section.title}-${section.sectionIdx}`} className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleToggleSection(section.sectionIdx)}
                                        title={section.title}
                                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider transition-all duration-200
                                            ${(openSections[String(section.sectionIdx)] ?? false)
                                                ? 'border-yellow-100/40 bg-richblack-600 text-yellow-50 shadow-md'
                                                : 'border-richblack-600 bg-richblack-700 text-richblack-25 hover:border-yellow-100/40 hover:bg-richblack-600 hover:text-yellow-50'
                                            }`}
                                        aria-expanded={openSections[String(section.sectionIdx)] ?? false}
                                    >
                                        <span className="truncate text-[14px]">{section.title.length > 50 ? `${section.title.substr(0,50)} ...` : section.title}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-richblack-800 px-2 py-[2px] ml-4 text-[10px] font-bold normal-case tracking-normal text-yellow-50/90">
                                                {section.lectures.length}
                                            </span>
                                            <FaChevronDown
                                                className={`text-[11px] transition-transform duration-200 ${(openSections[String(section.sectionIdx)] ?? false) ? 'rotate-0' : '-rotate-90'}`}
                                            />
                                        </div>
                                    </button>

                                    {(openSections[String(section.sectionIdx)] ?? false) && section.lectures.map((lecture) => (
                                        <button
                                            key={`${lecture.videoId}-${lecture.globalIdx}`}
                                            ref={(el) => {
                                                lectureItemRefs.current[lecture.globalIdx] = el;
                                            }}
                                            onClick={() => setSelectedIdx(lecture.globalIdx)}
                                            title={lecture.title}
                                            className={`ml-3 flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left font-inter text-sm transition-all duration-200
                                            ${selectedIdx === lecture.globalIdx
                                                ? 'border-yellow-100/60 bg-richblack-600 text-yellow-50 shadow-md'
                                                : 'border-richblack-600 bg-richblack-800 text-richblack-100 hover:border-yellow-100/40 hover:bg-richblack-700 hover:text-yellow-50'
                                            }`}
                                        >

                                            <div className="flex min-w-0 items-center gap-2.5">
                                                <span className={` p-0.5 rounded-full transition-colors duration-200 ${selectedIdx === lecture.globalIdx ? 'bg-yellow-50' : 'bg-richblack-400'}`} />
                                                <span className="truncate text-sm">
                                                    {lecture.title.length > 55 ? `${lecture.title.substr(0,55)} ...` : lecture.title}
                                                </span>
                                            </div>

                                            <span className={`rounded-full px-2.5 w-6 h-6 flex items-center justify-center font-bold text-md border-2 transition-all duration-300
                                            ${selectedIdx === lecture.globalIdx
                                                ? 'bg-yellow-100 border-yellow-400 text-richblack-900'
                                                : 'bg-richblack-900 border-richblack-600 text-yellow-50'
                                            }`}>
                                                {
                                                    ytCourseProgress?.isCompleted?.includes(lecture.videoId) && (
                                                        <span className='text-3xl text-green-600 bg-white rounded-full'><IoIosCheckmarkCircle /></span>
                                                    )
                                                }
                                            </span>


                                        </button>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </aside>
                
                {/* Main: Video Player */}
                <div className="relative flex flex-col justify-start items-center w-full h-full overflow-hidden">
                    {/* {ytCourse.description && (
                        <p className="mt-2 px-6 text-center text-richblack-200">{ytCourse.description}</p>
                    )} */}
                    <div className="w-full h-full overflow-y-auto pb-[92px]">
                    <main className="flex flex-col items-center p-8 animate-slidein-up w-[100%] min-h-fit">
                    
                        <div className="w-full max-w-[1800px] min-h-[420px] aspect-[16/8] rounded-xl overflow-auto shadow-2xl border border-yellow-50 animate-fadein">
                            {currentVideoId ? (
                                <iframe
                                    key={currentVideoId}
                                    ref={ytPlayerRef}
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&enablejsapi=1`}
                                    title={currentLecture?.title || `Lecture ${selectedIdx + 1}`}
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

                        {currentLecture && (
                            <div className="mt-5 w-full max-w-[1800px] max-h-[240px] overflow-y-auto rounded-lg border border-richblack-700 bg-richblack-800/70 px-5 py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-yellow-50/80">
                                    {currentLecture.sectionTitle}
                                </p>
                                <h2 className="mt-2 text-center text-xl font-semibold text-richblack-5">
                                    {currentLecture.title}
                                </h2>
                                {currentLecture.description && (
                                    <p className="mt-2 text-sm leading-6 text-richblack-200">
                                        {currentLecture.description?.length < 50 ? currentLecture.description : `${currentLecture.description.substr(0,500)}...`}
                                    </p>
                                )}
                            </div>
                        )}
                    </main>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-40 w-full">
                        <div className="mx-auto w-full rounded-t-2xl border-t border-richblack-600 bg-richblack-800/95 px-4 py-4 md:px-6 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-wrap items-center gap-3 md:gap-4">
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

                                <div className='flex gap-3'>
                                    <button
                                        onClick={() => handleSeekBy(-5)}
                                        disabled={!currentVideoId || !isPlayerApiReady}
                                        className="rounded-lg border border-richblack-600 bg-richblack-700 px-5 py-2.5 text-xl font-semibold text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100 hover:bg-richblack-600 hover:text-yellow-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <p className='transform -scale-x-100'>
                                            <MdForward5/>
                                        </p>
                                    </button>

                                    <button
                                        onClick={handleTogglePlayback}
                                        disabled={!currentVideoId || !isPlayerApiReady}
                                        className="rounded-lg border border-richblack-600 bg-richblack-700 px-5 py-2.5 text-xl font-semibold text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100 hover:bg-richblack-600 hover:text-yellow-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {isVideoPaused ? <TbPlayerPlay/> : <TbPlayerPause/>}
                                    </button>

                                    <button
                                        onClick={() => handleSeekBy(5)}
                                        disabled={!currentVideoId || !isPlayerApiReady}
                                        className="rounded-lg border border-richblack-600 bg-richblack-700 px-5 py-2.5 text-xl font-semibold text-richblack-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-100 hover:bg-richblack-600 hover:text-yellow-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <MdForward5/>
                                    </button>

                                    <div className="flex items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2">
                                        <span className="text-xl font-semibold uppercase tracking-wide text-richblack-100">
                                            <SlSpeedometer/>
                                        </span>
                                        <select
                                            value={playbackRate}
                                            onChange={handleChangePlaybackRate}
                                            disabled={!currentVideoId || !isPlayerApiReady}
                                            className="bg-richblack-500 text-richblack-5 rounded-md"
                                            aria-label="Video playback speed"
                                        >
                                            {speedOptions.map((speed) => (
                                                <option key={speed} value={speed}>
                                                    {speed}x
                                                </option>
                                            ))}
                                        </select>
                                    </div>
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

               
            </div>
        </div>
    );
};

export default YtCourse;