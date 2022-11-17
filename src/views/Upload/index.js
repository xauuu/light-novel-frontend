import React from "react";
import "./Upload.scss";
import Empty from "./Empty/index";
import List from "./List/index";

const Upload = () => {
  return (
    <div className="upload-container">
      <div className="main">
        <Empty />
        {/* <List /> */}
      </div>
    </div>
  );
};

export default Upload;
