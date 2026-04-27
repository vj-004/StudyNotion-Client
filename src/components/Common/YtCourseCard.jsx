import React from 'react';
import Logo from '../../assets/Logo/courseX_logo.png';
import YtCourseStatusDot from './YtCourseStatusDot';
import { ytCourseStatus } from '../../constants';

const YtCourseCard = ({
  course,
  onClick,
  className = '',
  showStatusLabel = false,
}) => {
  const thumbnailUrl = course?.playlistDetails?.thumbnail?.url;

  return (
    <div
      className={`w-[300px] h-fit bg-richblack-700 rounded-lg flex flex-col border border-richblack-600 shadow-md hover:shadow-yellow-25 transition-all duration-200 cursor-pointer ${className}`}
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
          { course?.title ? course?.title.length > 20 ? `${course?.title.substr(0,20)}...` : course?.title : 'Untitled Course'}
        </p>
        <div className="shrink-0 mt-0.5">
          <YtCourseStatusDot
            status={course?.status || ytCourseStatus.READY}
            showLabel={showStatusLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default YtCourseCard;
