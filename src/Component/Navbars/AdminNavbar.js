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
import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import "../../Assets/Styles/main.css";
import { useSelector, useDispatch } from "react-redux";

import RouteData from "../../Routes/RouteData";
import { getAdmin } from "../../Redux/Actions/auth.action";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  let userData = JSON.parse(localStorage.getItem("user"))
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const id = userData._id;
  const [user, setUser] = useState({});
  useEffect(() => {
    if (id) {
      dispatch(getAdmin(id))
    }
  }, [id])

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const onLogout = () => {
    localStorage.clear();
    auth.authenticate = false;
    if (userData.type === "Admin") {
      history.push("/");
    } else {
      history.push("/user-login");
    }
  };
  if (!localStorage.getItem("token")) {
    return <Redirect to={`/`} />;
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand href="#home" className="mr-2">
              {user ? (
                <div>
                  <img src={user.image} className="img-user" alt="Admin" />
                  {user.firstName} {user.lastName}
                </div>
              ) : null}
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="justify-content-end"
              navbar
              style={{ width: "100%" }}
            >
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="no-icon" onClick={handleShow}>
                    Log out
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ModalTitle">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to logout?</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button
            variant="primary"
            onClick={() => onLogout()}
            className="btn-outline-primary"
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
