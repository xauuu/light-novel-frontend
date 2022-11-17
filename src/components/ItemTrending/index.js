import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemTrending.scss";

const ItemTrending = (props) => {
  const { id, rating, image, title, description, tag } = props;
  return (
    <div className="trendlist">
      <span className="trendlist__rating">{rating}</span>
      <div className="trendlist__image">
        <NavLink to={`detail/${id}`}>
          <img src={image} alt={title} />
        </NavLink>
      </div>
      <div className="trendlist__content">
        <div className="trendlist__content__title">
          <NavLink to={`detail/${id}`}>{title}</NavLink>
        </div>
        <div className="trendlist__content__description">{description}</div>
        <div className="trendlist__content__tag">
          {tag.map((item, index) => (
            <NavLink to={"/tags/" + item} key={index}>
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemTrending;
