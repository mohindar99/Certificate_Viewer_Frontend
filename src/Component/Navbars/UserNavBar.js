import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../../Redux/Actions/user.action";
import "../../Assets/Styles/user.scss";
import { Modal, Button } from "react-bootstrap";

const UserNavBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user);
  const token = location.search.split("token=")[1];
  useEffect(() => {
    if (token) {
      dispatch(userDetails(token));
    }
  }, [token]);
  useEffect(() => {
    if (user.user) {
      setName(user.user.name);
    }
  }, [user]);

  const onLogout = () => {
    localStorage.clear();
    history.push("/user-login");
  };
  if (!localStorage.getItem("token")) {
    return <Redirect to={`/`} />;
  }
  return (
    <div>
      <Navbar>
        <Container className="userContainer">
          <Navbar.Brand href="#home">{name ? name : null}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="no-icon" onClick={handleShow}>
                Logout
              </span>
            </Navbar.Text>
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
    </div>
  );
};

export default UserNavBar;
