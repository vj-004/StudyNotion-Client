
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import YtCourseCard from '../Common/YtCourseCard';
import CatalogPlaylistCard from '../Common/CatalogPlaylistCard';
import CreateYtCourseModal from '../Common/CreateYtCourseModal';
import { createYtCourse, getAllYtPlaylists } from '../../services/operations/courseDetailsAPI';



const Catalog = () => {
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allytPlaylists, setAllytPlaylists] = useState([]);
  const [createModal, setCreateModal] = useState(null);

  const mergedPlaylists = allytPlaylists.map((playlist) => {
    const matchedUserCourse = user?.ytCourses?.find(
      (course) => course?.url_id === playlist?.playlist_id,
    );

    if (!matchedUserCourse) {
      return {
        ...playlist,
        isUserCourse: false,
      };
    }

    return {
      ...playlist,
      title: matchedUserCourse?.title || playlist?.playlistDetails?.title || 'Untitled Playlist',
      isUserCourse: true,
      status: 'user-course',
    };
  });

  useEffect(() => {
    const getAllPlaylist = async () => {
      setLoading(true);

      const response = await getAllYtPlaylists(currentPage, dispatch, navigate);
      setAllytPlaylists((prevPlaylists) => {
        const nextPlaylists = response?.YtCourses || [];
        return currentPage === 1 ? nextPlaylists : [...prevPlaylists, ...nextPlaylists];
      });
      setTotalPages(response?.totalPages || 1);

      setLoading(false);
    };

    getAllPlaylist();

  }, [currentPage, dispatch, navigate]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCreateYtCourse = async (playlistId, playlistName, playlistDescription) => {
    const data = {
      playlistURL: playlistId,
      playlistName,
      descp: playlistDescription,
    };

    await createYtCourse(data, token, dispatch, navigate);
    setCreateModal(null);
  };

  const handleCatalogCourseClick = (playlist) => {
    if (playlist?.isUserCourse) {
      navigate(`/ytcourse/${playlist?.url_id}`);
      return;
    }

    setCreateModal({
      btn1Text: 'Create',
      btn2Text: 'Close',
      btn1Handler: handleCreateYtCourse,
      btn2Handler: () => setCreateModal(null),
      initialPlaylistId: playlist?.playlist_id || '',
      initialPlaylistName: playlist?.playlistDetails?.title || playlist?.title || '',
      initialPlaylistDescription: playlist?.playlistDetails?.description || '',
      lockPlaylistId: true,
    });
  };


  return (
    <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center bg-richblack-900 overflow-hidden">
      {/* Modern Banner/Header */}
      <div className="w-full shrink-0 bg-gradient-to-r from-richblack-800 via-richblue-500 to-richblack-900 py-12 mb-6 flex flex-col items-center border-b border-richblack-700 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-2 font-inter tracking-tight drop-shadow-lg">
          Explore Catalog
        </h1>
        <p className="text-sm text-richblack-200 text-center mt-2 mb-4 font-inter">
          {"Browse our categories and discover top courses!"}
        </p>
        
      </div>

      {/* Main Content: Courses left, YouTube right */}
      <div className="w-[90%] max-w-full flex flex-1 min-h-0 gap-8 mb-12 overflow-hidden">


        {/* Courses Section */}
        <div className="flex-1 p-8 flex flex-col rounded-xl border border-richblack-700 bg-richblack-800 shadow-md w-[50%] h-full overflow-hidden">
          {token && <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-2 md:mb-0">Your Courses</h2>
          </div>}

          {/* Your YouTube Courses Section (vertical, right, full height) */}
          {
            token && (
              <div className="mb-5 w-full min-w-0">
                <div className="flex h-full w-full min-w-0 items-center rounded-xl border border-richblack-700 bg-richblack-800/95 p-4 shadow-md">
                  {
                    loading ? (
                      <div className="flex justify-center items-center h-32">
                        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-yellow-25" />
                      </div>
                    ) : user.ytCourses.length > 0 ? (
                      <div className="catalog-scrollbar w-full min-w-0 overflow-x-scroll overflow-y-hidden pb-2">
                        <div className="flex w-max flex-nowrap items-start gap-8">
                        {user.ytCourses.map((course, index) => {
                          return (
                            <div key={index} className="mb-3">
                              <YtCourseCard
                                course={course}
                                onClick={() => navigate(`/ytcourse/${course.url_id}`)}
                              />
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-24 w-full rounded-lg border border-richblack-600 bg-richblack-700/80">
                        <span className="text-richblack-5 text-base font-bold font-inter mb-2">Your List is Empty</span>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-2 md:mb-0">Courses</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-25" />
            </div>
          ) : mergedPlaylists.length > 0 ? (
            <div className="flex h-full min-h-0 w-full flex-col">
              <div className="catalog-scrollbar flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2">
                <div className="flex flex-wrap gap-6 justify-center">
                  {mergedPlaylists.map((playlist, index) => {
                    return (
                      <div key={index} className="flex justify-center">
                        <CatalogPlaylistCard
                          playlist={playlist}
                          onClick={() => handleCatalogCourseClick(playlist)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-yellow-50 bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentPage === totalPages ? 'No More Courses' : 'Load More'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full rounded-lg border border-richblack-600 bg-richblack-700/80 p-10">
              <span className="text-richblack-5 text-2xl font-bold font-inter mb-2">No Courses Found</span>
            </div>
          )}

        </div>



      </div>
      {
        createModal && <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"></div>
            <div className="fixed top-1/2 left-1/2 z-40 w-[30%] -translate-x-1/2 -translate-y-1/2 animate-slideDown shadow-lg">
                <CreateYtCourseModal modalData={createModal}/>
            </div>
        </>
      }
    </div>
  );
};

export default Catalog;