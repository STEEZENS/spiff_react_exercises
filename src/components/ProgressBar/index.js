import React from 'react';

const ProgressBar = ({
  percent,
  isInProgress,
  isFinished,
  transitionDuration = 1000,
}) => {
  const computedStyle = {
    width: `${percent}%`,
    transitionDuration: `${transitionDuration}ms`,
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
