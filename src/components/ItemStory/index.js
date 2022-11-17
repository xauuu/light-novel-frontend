import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { NavLink } from "react-router-dom";
import "./ItemStory.scss";

const ItemStory = (props) => {
  const { img, title, genres, id, rating, chapter, description } = props;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>{description}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger placement="right" overlay={popover}>
      <div className="item-story">
        <NavLink to={`detail/${id}`}>
          <div className="thumbnail">
            <img src={img} alt={title} />
            <div className="chap">Chapter {chapter}</div>
          </div>
          <div className="info">
            <div>
              <div className="title">{title}</div>
              <div className="genres">{genres}</div>
            </div>
            <div className="rating">{rating}</div>
          </div>
        </NavLink>
      </div>
    </OverlayTrigger>
  );
};

export default ItemStory;
