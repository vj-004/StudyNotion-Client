import React from 'react';
import { ytCourseStatus } from '../../constants';

const STATUS_STYLES = {
  [ytCourseStatus.READY]: {
    dot: 'bg-caribbeangreen-300',
    text: 'text-caribbeangreen-300',
    label: 'Ready',
  },
  [ytCourseStatus.PROCESSING]: {
    dot: 'bg-blue-50',
    text: 'text-blue-50',
    label: 'Processing',
  },
  [ytCourseStatus.FAILED]: {
    dot: 'bg-pink-200',
    text: 'text-pink-200',
    label: 'Failed',
  },
};

const YtCourseStatusDot = ({ status = ytCourseStatus.READY, showLabel = true, className = '' }) => {
  const statusStyle = STATUS_STYLES[status];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`h-2.5 w-2.5 rounded-full ${statusStyle.dot}`}
        aria-hidden="true"
      ></span>

      {showLabel && (
        <span className={`text-xs font-medium ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      )}
    </div>
  );
};

export default YtCourseStatusDot;