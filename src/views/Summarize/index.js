import React, { useState } from "react";
import { Grid, Divider, IconButton, TextField, MenuItem, Slider } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { MdCopyAll } from "react-icons/md";
import "./Summarize.scss";
import { summarize } from "./../../apis/summarize";
import Highlight from "./../../components/TextHighLight/index";

const Summarize = () => {
  const [summaryData, setSummaryData] = useState({
    text: "",
    method: "textrank",
    sentences: 3
  });

  const [summary, setSummary] = useState("");

  const handleChange = (e) => {
    setSummaryData({ ...summaryData, [e.target.name]: e.target.value });
  };

  const handeInputChange = (e) => {
    setSummaryData({ ...summaryData, text: e.currentTarget.textContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await summarize(summaryData);
    setSummary(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const countWords = (str) => {
    if (str?.length === 0) {
      return 0;
    } else {
      str = str?.replace(/(^\s*)|(\s*$)/gi, "");
      str = str?.replace(/[ ]{2,}/gi, " ");
      str = str?.replace(/\n /, "\n");
      return str?.split(" ").length;
    }
  };

  return (
    <Grid container className="summarize">
      <Grid container className="summarize__title" spacing={2}>
        <Grid item xs={6}>
          <h1>Summarize</h1>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth select size="small" name="method" value={summaryData.method} onChange={handleChange} variant="outlined">
            <MenuItem value="textrank">TextRank</MenuItem>
            <MenuItem value="frequency">Frequency</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <Slider
            value={summaryData.sentences}
            onChange={(e, newValue) => {
              setSummaryData({ ...summaryData, sentences: newValue });
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
          />
        </Grid>
      </Grid>
      <Grid className="sum-container" container>
        <Grid item className="sum-content">
          <div className="summarize__input">
            <Highlight text={summaryData.text} highlight={summary} handeInputChange={handeInputChange} />
          </div>
        </Grid>
        <Divider className="divider" orientation="vertical" flexItem />
        <Grid className="sum-content">
          <div className="summarize__output">
            <div>
              {summary ? (
                summary
              ) : (
                <div>
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6 }} />
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6, width: "75%" }} />
                  <Skeleton animation="wave" height={25} style={{ marginBottom: 6, width: "50%" }} />
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid container className="summarize__footer">
          <Grid item className="footer-content">
            {summaryData.text ? (
              <div className="words">{countWords(summaryData.text)} Words</div>
            ) : (
              <div className="upload">
                <label htmlFor="file-input">Upload</label>
                <input id="file-input" type="file" />
              </div>
            )}
            <button className="summary" onClick={handleSubmit}>
              Summarize
            </button>
          </Grid>
          <Divider className="divider" orientation="vertical" flexItem />
          <Grid item className="footer-content">
            <div className="words">{countWords(summary)} Words</div>
            <IconButton onClick={handleCopy}>
              <MdCopyAll />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summarize;
