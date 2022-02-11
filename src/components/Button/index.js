import React from 'react';

const Button = ({
  className,
  children,
  theme = '',
  type = 'button',
  isDisabled,
  onClick,
}) => {
  return (
    <button
      className={`Button theme-${theme} ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
