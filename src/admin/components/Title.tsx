import React, { ReactNode } from "react";

const Title: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <h1 className="text-xl font-semibold mb-5">{children}</h1>;
};
export default Title;
