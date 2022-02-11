import React, { useState, useReducer } from 'react';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import InputCheckbox from '../../components/InputCheckbox';

const INACTIVE = 'INACTIVE';
const LOADING = 'LOADING';
const FINISHED = 'FINISHED';
const HANG_AT_PERCENT = 90;

const ProgressBarSolution = ({
  breakpoints = [12, 54, 72],
  hangAtMs = 15000,
}) => {
  const [
    breakpointTimeoutId,
    setBreakpointTimeoutId,
  ] = useState(null);

  const [
    animationState,
    dispatchAnimation
  ] = useReducer(animationMapReducer, {
    width: 0,
    isLoading: false,
    isFinished: false,
    transitionDuration: 0,
  });

  const [
    isBreakpoints,
    setIsBreakpoints,
  ] = useState(true);

  function animationMapReducer(state, {
    type,
    percent,
    transitionDuration,
    transitionTimingFunction,
  }) {
    switch (type) {
      case INACTIVE:
        return {
          width: 0,
          isLoading: false,
          isFinished: false,
          transitionDuration: 0,
        };

      case LOADING:
        return {
          width: percent || HANG_AT_PERCENT,
          isLoading: true,
          isFinished: false,
          transitionDuration: transitionDuration || hangAtMs,
          transitionTimingFunction: transitionTimingFunction || 'linear',
        };

      case FINISHED:
        return {
          width: 100,
          isLoading: true,
          isFinished: true,
          transitionDuration: 1000,
          transitionTimingFunction: 'ease',
        };

      default:
        return state;
    }
  };

  function normalizeBreakpoints(breakpoints, hangAtMs) {
    const breakpointsFiltered = [...breakpoints]
      .filter((b) => b < HANG_AT_PERCENT);

    const breakpointsSorted = [...breakpointsFiltered, HANG_AT_PERCENT]
      .sort((a, b) => a - b);

    const breakpointsDecorated = breakpointsSorted.map((breakpoint, index) => {
      const prevB = breakpointsSorted[index - 1] || 0;
      const duration = hangAtMs * ((breakpoint - prevB) / 100);

      return {
        width: breakpoint,
        transitionDuration: duration,
        transitionTimingFunction: 'ease',
      }
    });

    return breakpointsDecorated;
  }

  function recurseBreakpoints(breakpoints, activeIndex) {
    const {
      width,
      transitionDuration,
      transitionTimingFunction,
    } = breakpoints[activeIndex];

    dispatchAnimation({
      type: LOADING,
      percent: width,
      transitionDuration,
      transitionTimingFunction,
    });

    const nextIndex = activeIndex + 1;
    const isNextBreakpoint = nextIndex < breakpoints.length;

    if (isNextBreakpoint) {
      return setBreakpointTimeoutId(setTimeout(
        () => recurseBreakpoints(breakpoints, nextIndex),
        transitionDuration,
      ));
    }
  }

  function startRequest() {
    return isBreakpoints
      ? recurseBreakpoints(normalizeBreakpoints(breakpoints, hangAtMs), 0)
      : dispatchAnimation({ type: LOADING });
  }

  function finishRequest() {
    clearBreakpointTimeoutId();
    dispatchAnimation({ type: FINISHED });
    setTimeout(() => resetRequest(), 3000);
  }

  function resetRequest() {
    dispatchAnimation({ type: INACTIVE });
  }

  function clearBreakpointTimeoutId() {
    clearTimeout(breakpointTimeoutId);
    setBreakpointTimeoutId(null);
  }

  function handleProgressTypeInput() {
    clearBreakpointTimeoutId();
    resetRequest();
    setIsBreakpoints(!isBreakpoints);
  }

  return (
    <div
      className="ProgressBarSolution">
      <ProgressBar
        percent={animationState.width}
        isInProgress={animationState.isLoading}
        isFinished={animationState.isFinished}
        transitionDuration={animationState.transitionDuration}
        transitionTimingFunction={animationState.transitionTimingFunction}
      />

      <div
        className="ProgressBarSolution__actions">
        <InputCheckbox
          isChecked={isBreakpoints}
          isDisabled={animationState.isFinished}
          onInput={handleProgressTypeInput}>
          Load with breakpoints
        </InputCheckbox>

        <div>
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
      </div>
    </div>
  );
}

export default ProgressBarSolution;
