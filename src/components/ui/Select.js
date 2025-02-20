import React from "react";

const Select = ({ children, className, ...props }) => {
  return (
    <select
      className={`border rounded-md p-2 w-full ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
