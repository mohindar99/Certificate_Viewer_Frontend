/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img
                src={require("../../Assets/img/badge.png").default}
                alt="..."
              />
            </div>
          </a>
          <p>Certificate Viewer</p>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.layout) {
              if (prop.isSideBar)
                if (prop.type === user.type)
                  if (!prop.redirect)
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : activeRoute(prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
              return null;
            }
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
