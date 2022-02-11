import React from 'react';

const ProgressBar = ({
  percent,
  isInProgress,
  isFinished,
  transitionDuration = 1000,
  transitionTimingFunction = 'ease',
}) => {
  const computedStyle = {
    width: `${percent}%`,
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction,
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
