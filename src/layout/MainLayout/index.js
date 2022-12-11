import React from "react";
import Header from "./Header/index.js";

function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">{children}</div>
    </React.Fragment>
  );
}

export default MainLayout;
