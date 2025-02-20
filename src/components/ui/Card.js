import React from "react";

const Card = ({ children }) => {
  return <div className="border p-4 rounded shadow">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export default Card;
