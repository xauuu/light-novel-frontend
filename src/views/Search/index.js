import { Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import "./Search.scss";
import { MdSearch } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchNovel } from "../../apis/novel.js";
import ItemTrending from "./../../components/ItemTrending/index";

const Search = () => {
  const keyword = new URLSearchParams(useLocation().search).get("keyword");
  const [search, setSearch] = React.useState(keyword);

  const handleEnter = (e) => {
    if (e.key === "Enter" && search !== "") {
      window.location.href = "/search?keyword=" + search;
    }
  };

  const { data, isLoading } = useQuery(["search", keyword], () => searchNovel(keyword));

  React.useEffect(() => {
    setSearch(keyword);
  }, [keyword]);

  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item xs={7}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch />
              </InputAdornment>
            )
          }}
          fullWidth
          variant="standard"
          size=""
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleEnter}
        />
      </Grid>
      <Grid item xs={7}>
        {!isLoading && <h6>About {data.length} results</h6>}
        {!isLoading && data.map((item) => <ItemTrending novel={item} />)}
      </Grid>
    </Grid>
  );
};

export default Search;
