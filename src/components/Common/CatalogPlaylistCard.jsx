import React from 'react';
import Logo from '../../assets/Logo/courseX_logo.png';

const CatalogPlaylistCard = ({
  playlist,
  onClick,
  className = '',
}) => {
  const thumbnailUrl = playlist?.playlistDetails?.thumbnail?.url;
  const isUserCourse = playlist?.isUserCourse;
  const playlistTitle = playlist?.title || playlist?.playlistDetails?.title || 'Untitled Playlist';
  const playlistId = playlist?.playlist_id || playlist?.url_id;
  const playlistUrl = playlistId
    ? playlistId.startsWith('http')
      ? playlistId
      : `https://www.youtube.com/playlist?list=${playlistId}`
    : null;

  return (
    <div
      className={`w-[300px] h-fit rounded-lg flex flex-col border shadow-md transition-all duration-200 cursor-pointer ${isUserCourse ? 'border-caribbeangreen-100 bg-caribbeangreen-900/40 hover:shadow-caribbeangreen-100' : 'border-richblack-600 bg-richblack-700 hover:shadow-yellow-25'} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <img
        src={thumbnailUrl ? thumbnailUrl : Logo}
        alt="thumbnail"
        width={192}
        height={120}
        onError={(event) => {
          event.currentTarget.src = Logo;
        }}
        className="self-center mb-3 w-full aspect-video object-cover rounded-md shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-shadow duration-200 hover:shadow-[0_12px_22px_rgba(0,0,0,0.45)]"
      />
      <div className="flex items-start justify-between gap-2 w-full mb-1 p-2">
        <p className="text-richblack-5 text-sm font-semibold leading-5 line-clamp-2 flex-1 min-w-0">
          {playlistTitle.length > 20 ? `${playlistTitle.substr(0,20)}...` : playlistTitle}
        </p>
        {isUserCourse && (
          <span className="shrink-0 rounded-full bg-caribbeangreen-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-richblack-900">
            Enrolled
          </span>
        )}
      </div>
      {playlistUrl && (
        <div className="px-2 pb-3">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="inline-flex text-xs font-semibold text-yellow-50 underline underline-offset-2 hover:text-yellow-25"
          >
            View on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default CatalogPlaylistCard;