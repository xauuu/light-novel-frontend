import React from "react";
import Grid from "@material-ui/core/Grid";
import "./NovelDetail.scss";
import PopularSection from "./../Section/PopularSection";
import { NavLink, useParams } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import Rating from "@material-ui/lab/Rating";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, Paper } from "@material-ui/core";
import TablePaginationActions from "./../../components/TablePaginationActions/index";
import ShareSocial from "./../../components/ShareSocial/index";
import { getNovelDetail } from "./../../apis/novel";
import { useQuery } from "@tanstack/react-query";

const NovelDetail = () => {
  const { novelId } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { data: novel, isLoading } = useQuery(["novel", novelId], () => getNovelDetail(novelId));

  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={12}>
        {!isLoading && (
          <div className="novel-detail">
            <div className="animefull">
              <div className="header__banner">
                <img alt="" src={novel?.banner_url} />
                <NavLink to={`${novelId}/chapter/${novel?.chapter?.[0]?.chapter_number}`} className="header__banner__read">
                  <FaBookOpen />
                </NavLink>
              </div>
              <div className="header__content">
                <div className="header__content__image">
                  <img alt="" src={novel?.image_url} />
                  <div className="header__content__rating">
                    <Rating value={novel?.rating} readOnly precision={0.1} />
                  </div>
                </div>
                <div className="header__content__info">
                  <h1>{novel?.title}</h1>
                  <div>
                    Read full chapter <strong>{novel?.title}</strong>, Light Novel {novel?.title} english, LN {novel?.title},{novel?.title} Online, read{" "}
                    {novel?.title} at LightNovel.
                  </div>
                  <div className="header__content__info__spe">
                    <span>
                      <strong>Author: </strong>
                      {novel?.created_by}
                    </span>
                    <span>
                      <strong>Status: </strong>
                      {novel?.status}
                    </span>
                    <span>
                      <strong>Released: </strong>xau
                    </span>
                    <span>
                      <strong>View: </strong>
                      {novel?.views}
                    </span>
                    <span>
                      <strong>Posted on: </strong>
                      {novel?.updated_by}
                    </span>
                    <span>
                      <strong>Updated on: </strong>
                      {novel?.updated_at}
                    </span>
                  </div>
                  <div className="header__content__info__genres">
                    {novel?.genres?.map((genre) => (
                      <NavLink to={`/genres/${genre}`} key={genre}>
                        {genre}
                      </NavLink>
                    ))}
                  </div>
                  <div className="header__content__info__more">
                    Read complete <strong>{novel?.title}</strong> on LightNovel. You can also read {novel?.title} free and no registration required, We always
                    be the fastest to update series chapter {novel?.title}.
                  </div>
                </div>
              </div>
              <div className="header__tags">
                {novel?.tags?.map((tag) => (
                  <NavLink to={`/tags/${tag}`} key={tag}>
                    {tag}
                  </NavLink>
                ))}
              </div>
            </div>
            <br />
            <ShareSocial url={window.location.href} />
            <div className="box">
              <h2>Synopsis</h2>
              <div className="box__content">{novel?.description}</div>
            </div>
            <br />
            <div className="box chapter">
              <h2>Read </h2>
              <div className="chapter__firstlast">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <NavLink to={`${novelId}/chapter/${novel?.chapter?.[0]?.chapter_number}`}>
                      <span>First Chapter</span>
                      <span>Chapter {novel?.chapter?.[0]?.chapter_number}</span>
                    </NavLink>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <NavLink to={`${novelId}/chapter/${novel?.chapter?.slice(-1)[0]?.chapter_number}`}>
                      <span>New Chapter</span>
                      <span>Chapter {novel?.chapter?.slice(-1)[0]?.chapter_number}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="chapter__list">
                <TableContainer component={Paper}>
                  <Table aria-label="custom pagination table">
                    <TableBody>
                      {(rowsPerPage > 0 ? novel?.chapter?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : novel?.chapter)?.map((row) => (
                        <TableRow className="tableRow" component={NavLink} to={`${novelId}/chapter/${row.chapter_number}`} key={row.id}>
                          <TableCell style={{ width: 160 }}>Chapter {row.chapter_number}</TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {row.created_at}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[]}
                          colSpan={3}
                          count={novel?.chapter?.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
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
          </div>
        )}
      </Grid>
      <Grid item lg={4} md={12}>
        <PopularSection />
      </Grid>
    </Grid>
  );
};

export default NovelDetail;
