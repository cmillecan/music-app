import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const li = [
    {
      link: "/game",
      text: "Game",
    },
    {
      link: "/keyboard",
      text: "Keyboard",
    },
  ];

  return (
    <div className="navBar">
      <div className="nav-row">
        <ul className="links">
          {li.map((objLink, i) => {
            return (
              <li key={i}>
                <NavLink activeClassName="active" to={objLink.link}>
                  {objLink.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
