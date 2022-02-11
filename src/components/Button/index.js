import React from 'react';

const Button = ({
  className,
  children,
  theme = '',
  type = 'button',
  isDisabled,
  isLoading,
  onClick,
}) => {
  return (
    <button
      className={`Button theme-${theme} ${className} ${isLoading ? 'isLoading' : ''}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
