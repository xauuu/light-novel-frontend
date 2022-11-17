import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemCarousel from "./../../components/ItemCarousel/index";
import ItemTrending from "./../../components/ItemTrending/index";
import ItemPopular from "./../../components/ItemPopular/index";
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
    <Container fluid>
      <Row>
        <Col md={6}>
          <div className="title">Editor's Choice</div>
          {!isLoading && (
            <OwlCarousel className="owl-theme" margin={10} loop items={1} autoplay={false}>
              {carousel.map((novel, index) => (
                <ItemCarousel novel={novel} key={index} />
              ))}
            </OwlCarousel>
          )}
        </Col>
        <Col md={6}>
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
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div className="title">For You</div>
          <Row>
            <Col md={3}>
              <ItemStory
                img="https://i2.wp.com/lightnovel.themesia.com/wp-content/uploads/2019/04/1545815013.jpg?resize=151,215"
                title="Title"
                genres="Action, Adventure, Mystery, Xau"
                id="1"
                rating="8.50"
                description="In a land where no magic is present. A land where the strong make the rules and weak have to obey. "
              />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <PopularSection />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
