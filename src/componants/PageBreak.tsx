import React from "react";

const PageBreak = ({ children }: { children: React.ReactNode }) => {
  const style = {
    pageBreakAfter: "always" as const, // Specify the type of the value as 'const'
    display: "block" as const,
  };

  return <div style={style}>{children}</div>;
};

export default PageBreak;
