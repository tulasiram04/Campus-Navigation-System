import React, { HTMLAttributes } from 'react';

const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white dark:bg-[#1C1C1E] rounded-[10px] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;