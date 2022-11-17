import React from "react";
import { NavLink } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img src="https://lightnovel.themesia.com/wp-content/uploads/2022/08/logo-v2.png" alt="logo" />
        </NavLink>
      </div>
      <div className="header__links">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink exact to="/trending" activeClassName="active">
          Trending
        </NavLink>
        <NavLink exact to="/upload" activeClassName="active">
          Upload
        </NavLink>
      </div>
      <div className="header__search"></div>
      <div className="header__user">
        {/* <NavLink className="login" exact to="/login">
          Login
        </NavLink> */}
        <div className="user-menu">
          <img src="https://st.ntcdntempv3.com/data/sites/1/useravatars/1085844.jpg?v=5603" alt="user" />
          <div className="user-menu__dropdown">
            <NavLink exact to="/profile">
              <BiUser />
              Profile
            </NavLink>
            <NavLink exact to="/logout">
              <BiLogOut />
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
