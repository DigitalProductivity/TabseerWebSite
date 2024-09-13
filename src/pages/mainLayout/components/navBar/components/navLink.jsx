import React from "react";
import "../NavBar.css"
import { NavLink, useLocation  } from "react-router-dom";

function NavLinkComponent(props) {
  const location =useLocation()
  const isActive = location.pathname === props.to;
  const imgSrc = isActive ? props.activeSrc : props.src;
  return (
    <NavLink to={props.to} className={props.className} activeClassName="active">
      <li className={props.listStyles}>
        <div className="d-flex flex-row gap-2 align-items-center">
          <img src={imgSrc} style={{height:"40px", width:"40px"}}/>
          <p className="mb-0">{props.linkName}</p>
        </div>
      </li>
    </NavLink>
  );
}

export default NavLinkComponent;
