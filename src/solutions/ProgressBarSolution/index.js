import React, { useState, useEffect } from 'react';
import { clamp, round } from 'lodash';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

const ProgressBarSolution = ({ hangAfterSeconds = 15 }) => {
  const [intervalId, setIntervalId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isFinished) return setPercent(100);
    if (!isLoading) return setPercent(0);

    const newPercent = Math.floor((secondsElapsed / hangAfterSeconds) * 100);

    return setPercent(clamp(newPercent, 0, 90));
  }, [
    isLoading,
    isFinished,
    secondsElapsed,
    hangAfterSeconds,
  ]);

  function tick() {
    setSecondsElapsed((secondsElapsed) => {
      return round(secondsElapsed + 0.1, 2);
    });
  }

  function startRequest() {
    setIsLoading(true);
    setIntervalId(setInterval(tick, 100));
  }

  function finishRequest() {
    setIsFinished(true);
    clearInterval(intervalId)
    setIntervalId(null);
    setTimeout(() => resetRequest(), 3000);
  }

  function resetRequest() {
    setIsLoading(false);
    setIsFinished(false);
    setSecondsElapsed(0);
  }

  return (
    <div
      className="ProgressBarSolution">
      <ProgressBar
        percent={percent}
        isInProgress={isLoading}
        isFinished={isFinished}
      />

      <Button
        className="Button-start-request"
        theme="green"
        isDisabled={isLoading}
        isLoading={isLoading}
        onClick={startRequest}>
        <span
          className="__content">
          Start Request
        </span>
        <span
          className="__loading">
          Loading...
        </span>
      </Button>

      <Button
        theme="red"
        isDisabled={isFinished || !isLoading}
        onClick={finishRequest}>
        Finish Request
      </Button>
    </div>
  );
}

export default ProgressBarSolution;
