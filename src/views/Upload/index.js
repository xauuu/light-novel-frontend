import React from "react";
import "./Upload.scss";
import Empty from "./Empty/index";
import List from "./List/index";
import { getNovelListByUser } from "../../apis/novel.js";
import { useQuery } from "@tanstack/react-query";

const Upload = () => {
  const { data: listNovel } = useQuery(["myNovels"], getNovelListByUser);
  console.log(listNovel);
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
