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
import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

// import AdminNavbar from "../Component/Navbars/AdminNavbar";
// import Footer from "../Component/Footer/Footer";
import Sidebar from "../Component/Sidebar/Sidebar";
import FixedPlugin from "../Component/FixedPlugin/FixedPlugin";

import RouteData from "../Routes/RouteData";

import sidebarImage from "../Assets/img/sidebar-3.jpg";
import UserNavBar from "../Component/Navbars/UserNavBar";

function User() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  
  const getRoutes = (RouteData) => {
    return RouteData.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={RouteData}
        />
        <div className="main-panel" ref={mainPanel}>
          <UserNavBar />
          <div className="content">
            <Switch>{getRoutes(RouteData)}</Switch>
          </div>
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default User;
