import React from 'react';

const ProgressBar = ({ percent, isInProgress, isFinished }) => {
  const computedStyle = {
    width: `${percent}%`,
  };

  const computedClasses = [
    'ProgressBar',
    (isInProgress ? 'isInProgress' : ''),
    (isFinished ? 'isFinished' : ''),
  ].join(' ').trim();

  return (
    <div
      className={computedClasses}
      style={computedStyle}>
    </div>
  )
}

export default ProgressBar;
