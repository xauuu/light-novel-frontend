import React, { useEffect, useState } from "react";
import ItemCarousel from "./../../components/ItemCarousel/index";
import ItemTrending from "./../../components/ItemTrending/index";
import Grid from "@mui/material/Grid";
import PopularSection from "./../Section/PopularSection";
import ItemStory from "../../components/ItemStory/index.js";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getRandomNovels } from "./../../apis/home";
import { useQuery } from "@tanstack/react-query";
import { getNovelLastUpdate } from "./../../apis/novel";

const Home = () => {
  const { data: carousel, isLoading } = useQuery(["topNovel", 4], () => getRandomNovels(4));
  const { data: trending, isLoading: isLoadingTrending } = useQuery(["topNovel", 2], () => getRandomNovels(2));
  const { data: forU, isLoading: isLoadingForU } = useQuery(["lastUpdate", 8], () => getNovelLastUpdate(8));

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <div className="title">Editor's Choice</div>
          {!isLoading && (
            <OwlCarousel className="owl-theme" margin={10} loop items={1} autoplay={false}>
              {carousel.map((novel, index) => (
                <ItemCarousel novel={novel} key={index} />
              ))}
            </OwlCarousel>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="title">Trending</div>
          {!isLoadingTrending && trending.map((novel, index) => <ItemTrending novel={novel} key={index} />)}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <div className="title">For You</div>
          <Grid container spacing={3}>
            {!isLoadingForU &&
              forU.map((novel, index) => (
                <Grid item md={3} xs={6} key={index}>
                  <ItemStory novel={novel} />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item md={4} style={{ marginTop: "20px" }}>
          <PopularSection />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
