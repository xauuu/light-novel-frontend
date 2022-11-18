import React, { useEffect, useState } from "react";
import ItemCarousel from "./../../components/ItemCarousel/index";
import ItemTrending from "./../../components/ItemTrending/index";
import Grid from "@material-ui/core/Grid";
import PopularSection from "./../Section/PopularSection";
import ItemStory from "../../components/ItemStory/index.js";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getTopNovels } from "./../../apis/home";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: carousel, isLoading } = useQuery(["topNovel", 4], () => getTopNovels(4));

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
          <ItemTrending
            id="abcdef"
            rating="8.50"
            image="https://i3.wp.com/lightnovel.themesia.com/wp-content/uploads/2019/04/1491134473.jpg?resize=145,205"
            title="Title"
            description="In a land where no magic is presentIn a land where no magic is presentIn a land where no magic is presentIn a land where no magic is presentIn a land where no magic is present. A land where the strong make the rules and weak have to obey. "
            year="2019"
            tag={["Web Novel", "Action", "Adventure"]}
          />
          <ItemTrending
            id="abcdef"
            rating="8.50"
            image="https://i3.wp.com/lightnovel.themesia.com/wp-content/uploads/2019/04/1491134473.jpg?resize=145,205"
            title="Title"
            description="In a land where no magic is presentIn a land where no magic is presentIn a land where no magic is presentIn a land where no magic is presentIn a land where no magic is present. A land where the strong make the rules and weak have to obey. "
            year="2019"
            tag={["Web Novel", "Action", "Adventure"]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <div className="title">For You</div>
          <Grid container>
            <Grid item md={3}>
              <ItemStory
                img="https://i2.wp.com/lightnovel.themesia.com/wp-content/uploads/2019/04/1545815013.jpg?resize=151,215"
                title="Title"
                genres="Action, Adventure, Mystery, Xau"
                id="1"
                rating="8.50"
                description="In a land where no magic is present. A land where the strong make the rules and weak have to obey. "
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <PopularSection />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
