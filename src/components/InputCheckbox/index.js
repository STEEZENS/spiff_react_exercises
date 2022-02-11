import React from 'react';

const InputCheckbox = ({
  children,
  isChecked,
  isDisabled,
  onInput,
}) => {
  const computedClasses = [
    'InputCheckbox',
    (isChecked ? 'isChecked' : ''),
    (isDisabled ? 'isDisabled' : ''),
  ].join(' ').trim();

  function handleOnClick(e) {
    if (isDisabled) return e.preventDefault();
    onInput();
  }

  return (
    <div
      className={computedClasses}
      onClick={handleOnClick}>
      <div
        className="__box">
        <svg
          className="__svg"
          viewBox="0 0 16 16">
          <path
            className="__checkmark"
            d="M3.75 8.5 6.5 12 12.25 3.75"
          />
        </svg>
      </div>

      <div
        className="__label">
        {children}
      </div>
    </div>
  )
}

export default InputCheckbox;
