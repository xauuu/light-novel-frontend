import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../views/Header/index";
import Loading from "../components/Loading/index.js";
import AuthVerifyComponent from "../utils/auth-verify.js";
import AuthGuard from "./../components/Auth/AuthGuard";
const Home = lazy(() => import("../views/Home/index.js"));
const Account = lazy(() => import("../views/Account/index"));
const Upload = lazy(() => import("../views/Upload/index"));
const Create = lazy(() => import("../views/Upload/Create/index"));
const NovelDetail = lazy(() => import("../views/NovelDetail/index"));
const ChapterDetail = lazy(() => import("../views/ChapterDetail/index"));
const Summarize = lazy(() => import("./../views/Summarize/index"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail/:novelId" component={NovelDetail} />
            <Route path="/detail/:novelId/chapter/:chapterNumber" component={ChapterDetail} />
            <Route path="/summarize" component={Summarize} />
            <AuthGuard>
              <Route path="/upload" component={Upload} />
              {/* <Route exact path="/upload/create" component={Create} /> */}
            </AuthGuard>
            <Route exact path="/account" component={Account} />
          </Switch>
          <AuthVerifyComponent />
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
