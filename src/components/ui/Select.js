import React from "react";

const Select = ({ children, ...props }) => {
  return <select className="border p-2 rounded w-full" {...props}>{children}</select>;
};

export default Select;
