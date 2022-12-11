import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { NavLink } from "react-router-dom";
import "./ItemStory.scss";

const ItemStory = ({ novel }) => {
  const { image_url, title, genres, id, rating, chapter, description } = novel;

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
            <img src={image_url} alt={title} />
            <div className="chap">Chapter {chapter}</div>
          </div>
          <div className="info">
            <div>
              <div className="title">{title}</div>
              <div className="genres">{genres.join(", ")}</div>
            </div>
            <div className="rating">{rating}</div>
          </div>
        </NavLink>
      </div>
    </OverlayTrigger>
  );
};

export default ItemStory;
