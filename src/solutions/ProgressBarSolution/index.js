import React, { useReducer } from 'react';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

const INACTIVE = 'INACTIVE';
const LOADING = 'LOADING';
const FINISHED = 'FINISHED';

const ProgressBarSolution = ({ hangAfterMs = 15000 }) => {
  const [
    animationState,
    dispatchAnimation
  ] = useReducer(animationMapReducer, {
    width: 0,
    transitionDuration: 0,
    isLoading: false,
  });

  function animationMapReducer(state, { type }) {
    switch (type) {
      case INACTIVE:
        return {
          width: 0,
          transitionDuration: 0,
          isLoading: false,
        };

      case LOADING:
        return {
          width: 90,
          transitionDuration: hangAfterMs,
          isLoading: true,
        };

      case FINISHED:
        return {
          width: 100,
          transitionDuration: 1000,
          isLoading: true,
          isFinished: true,
        };

      default:
        return state;
    }
  };

  function startRequest() {
    dispatchAnimation({ type: LOADING });
  }

  function finishRequest() {
    dispatchAnimation({ type: FINISHED });
    setTimeout(() => resetRequest(), 3000);
  }

  function resetRequest() {
    dispatchAnimation({ type: INACTIVE });
  }

  return (
    <div
      className="ProgressBarSolution">
      <ProgressBar
        percent={animationState.width}
        isInProgress={animationState.isLoading}
        isFinished={animationState.isFinished}
        transitionDuration={animationState.transitionDuration}
      />

      <Button
        className="Button-start-request"
        theme="green"
        isDisabled={animationState.isLoading}
        isLoading={animationState.isLoading}
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
        isDisabled={animationState.isFinished || !animationState.isLoading}
        onClick={finishRequest}>
        Finish Request
      </Button>
    </div>
  );
}

export default ProgressBarSolution;
