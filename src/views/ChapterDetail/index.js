import React from "react";
import "./ChapterDetail.scss";
import Grid from "@mui/material/Grid";
import PopularSection from "./../Section/PopularSection";
import { NavLink, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineFormatListBulleted, MdSettings } from "react-icons/md";
import ShareSocial from "./../../components/ShareSocial/index";
import { getChapterDetail } from "./../../apis/chapter";
import { useQuery } from "@tanstack/react-query";
import Parser from "html-react-parser";
import { formatDateTime } from "../../utils/helper.js";

const ChapterDetail = () => {
  const { novelId, chapterNumber } = useParams();

  const { data: chapterDetail, isLoading } = useQuery(["chapter", chapterNumber, novelId], () => getChapterDetail(chapterNumber, novelId));

  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={12}>
        <div className="chapter-detail">
          <div className="title">
            <h1>Battle Through the Heavens Chapter {chapterNumber}</h1>
            <div>
              Posted by {chapterDetail?.created_by}, {chapterDetail?.views} Views, Released on {formatDateTime(chapterDetail?.updated_at)}
            </div>
          </div>
          <div className="actions">
            {chapterDetail?.previous && (
              <NavLink to={`./${chapterDetail?.previous.chapter_number}`} className="button pre">
                <MdKeyboardArrowLeft />
                <span>Prev</span>
              </NavLink>
            )}
            <NavLink to={`/detail/${novelId}`} className="button allchapter">
              <MdOutlineFormatListBulleted size={20} />
              <span>All Chapter</span>
            </NavLink>
            {chapterDetail?.next && (
              <NavLink to={`./${chapterDetail?.next.chapter_number}`} className="button next">
                <span>Next</span>
                <MdKeyboardArrowRight />
              </NavLink>
            )}
            <button className="button options">
              <MdSettings />
              <span>Options</span>
            </button>
          </div>
          <ShareSocial url={window.location.href} />
          <div className="content">{Parser(chapterDetail?.content || "")}</div>
          <div className="actions bottom">
            {chapterDetail?.previous && (
              <NavLink to={`./${chapterDetail?.previous.chapter_number}`} className="button pre">
                <MdKeyboardArrowLeft />
                <span>Prev</span>
              </NavLink>
            )}
            {chapterDetail?.next && (
              <NavLink to={`./${chapterDetail?.next.chapter_number}`} className="button next">
                <span>Next</span>
                <MdKeyboardArrowRight />
              </NavLink>
            )}
          </div>
        </div>
        <br />
        <div className="box comment">
          <h2>Comment</h2>
          <div className="comment__content">
            <div className="comment__content__nologin">
              <h3>Leave a Reply</h3>
              <div>You must be logged in to post a comment.</div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item lg={4} xs={12}>
        <PopularSection />
      </Grid>
    </Grid>
  );
};

export default ChapterDetail;
