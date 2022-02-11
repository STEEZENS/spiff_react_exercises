import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

function buildAnimationMap(hangMs) {
  // @TODO build breakpoints here...
  return [
    {
      id: 'INACTIVE',
      width: 0,
      transitionDuration: 0,
      isLoading: false,
    },
    {
      id: 'LOADING',
      width: 90,
      transitionDuration: hangMs,
      isLoading: true,
    },
    {
      id: 'FINISHED',
      width: 100,
      transitionDuration: 1000,
      isLoading: true,
      isFinished: true,
    },
  ];
}

const ProgressBarSolution = ({ hangAfterMs = 15000 }) => {
  const [animationMap, setAnimationMap] = useState(buildAnimationMap(hangAfterMs));
  const [activeAnimationId, setActiveAnimationId] = useState('INACTIVE');
  const [activeAnimationStep, setActiveAnimationStep] = useState({});

  // Rebuild animation map if deps change
  useEffect(() => {
    setAnimationMap(buildAnimationMap(hangAfterMs));
  }, [
    hangAfterMs,
  ]);

  // Set activeAnimationStep when activeAnimationId changes
  useEffect(() => {
    const newStep = animationMap.find(({ id }) => id === activeAnimationId);
    setActiveAnimationStep(newStep);
  }, [
    animationMap,
    activeAnimationId,
  ]);

  function startRequest() {
    setActiveAnimationId('LOADING');
  }

  function finishRequest() {
    setActiveAnimationId('FINISHED');
    setTimeout(() => resetRequest(), 3000);
  }

  function resetRequest() {
    setActiveAnimationId('INACTIVE');
  }

  return (
    <div
      className="ProgressBarSolution">
      <ProgressBar
        percent={activeAnimationStep.width}
        isInProgress={activeAnimationStep.isLoading}
        isFinished={activeAnimationStep.isFinished}
        transitionDuration={activeAnimationStep.transitionDuration}
      />

      <Button
        className="Button-start-request"
        theme="green"
        isDisabled={activeAnimationStep.isLoading}
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
        isDisabled={activeAnimationStep.isFinished || !activeAnimationStep.isLoading}
        onClick={finishRequest}>
        Finish Request
      </Button>
    </div>
  );
}

export default ProgressBarSolution;
