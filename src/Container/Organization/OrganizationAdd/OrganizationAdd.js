import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validate } from "../../../Utililties/validator";
import validationRules from "../../../Utililties/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddOrg, ResetOrg } from "../../../Redux/Actions/org.action";
import Backdrop from "@mui/material/Backdrop";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";

const OrganizationAdd = () => {
  const history = useHistory();
  const org = useSelector((state) => state.org);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoader, setShowLoader] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  useEffect(() => {
    if (org.message) {
      history.push("/organization");
     
    }
    if (org.error) {
    }
  }, [org.message, org.error]);

  useEffect(() => {
    if (org.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [org.loading]);

  const onAdd = (e) => {
    e.preventDefault();

    let valData = {
      companyName: name,
      email,
      mobileNo: phoneNumber,
    };
    let data = {
      name,
      email,
      phoneNumber,
    };
    if (Validation(valData, validationRules)) {
      dispatch(AddOrg(data));
    }
  };

  const Validation = (Field, Rule) => {
    let res = validate(Field, Rule);
    if (res.errors) {
      if (res.errors.email) {
        setErrorEmail(res.errors.email);
      }
      if (res.errors.companyName) {
        setErrorName(res.errors.companyName);
      }
      if (res.errors.mobileNo) {
        setErrorPhone(res.errors.mobileNo);
      }
    }
    return res.isValid;
  };
  return (
    <div>
      <Toast success={org.messgae} error={org.error} />
      <Loader showLoader={showLoader} />
      <Card>
        <Card.Header>
          <Card.Title as="h3">Add Organization</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onAdd}>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name of the Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of the Organization"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errorName ? (
                  <p style={{ color: "#c94040" }}>{errorName}</p>
                ) : null}
              </Form.Group>
            </Row>
            <Row>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Organization email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errorEmail ? (
                  <p style={{ color: "#c94040" }}>{errorEmail}</p>
                ) : null}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phoneNumber}
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errorPhone ? (
                  <p style={{ color: "#c94040" }}>{errorPhone}</p>
                ) : null}
              </Form.Group>
            </Row>

            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => history.push("/organization")}
              style={{ float: "right" }}
            >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrganizationAdd;
