import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import Login from "./../../../views/Login/index";
import { logout as userLogout } from "../../../apis/auth.js";
import { logout } from "../../../store/features/userSlice.js";

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await userLogout();
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleClose();
    }
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <Login isOpen={isOpen} handleClose={handleClose} />
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
          <NavLink exact to="/summarize" activeClassName="active">
            Summarize
          </NavLink>
          {isLoggedIn && (
            <NavLink exact to="/upload" activeClassName="active">
              Upload
            </NavLink>
          )}
        </div>
        <div className="header__search"></div>
        <div className="header__user">
          {isLoggedIn ? (
            <div className="user-menu">
              <img src={user.photo} alt="user" />
              <div className="user-menu__dropdown">
                <NavLink exact to="/profile">
                  <BiUser />
                  Profile
                </NavLink>
                <div onClick={handleLogout}>
                  <BiLogOut />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <button onClick={handleClickOpen}>Login</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
