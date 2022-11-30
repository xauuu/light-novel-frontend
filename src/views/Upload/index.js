import React from "react";
import "./Upload.scss";
import Empty from "./Empty/index";
import List from "./List/index";
import { getNovelListByUser } from "../../apis/novel.js";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import Create from "./Create/index";

const Upload = () => {
  let { path } = useRouteMatch();
  const { data: listNovel } = useQuery(["myNovels"], getNovelListByUser);
  return (
    <div className="upload-container">
      <div className="main">
        {/* <Empty /> */}
        <Switch>
          <Route exact path={path} component={Empty} />
          <Route path={`${path}/create`} component={Create} />
        </Switch>
      </div>
    </div>
  );
};

export default Upload;
