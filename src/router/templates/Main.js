import React from "react";
import Meta from "../../components/Meta";

const MainLayout = ({ children, meta }) => {
  return (
    <div>
      <Meta {...meta} />
      {children}
    </div>
  );
};

export default MainLayout;
