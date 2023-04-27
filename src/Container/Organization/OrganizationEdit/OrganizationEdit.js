import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Card, Row, Col } from "react-bootstrap";
import validationRules from "../../../Utililties/validation";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../../Utililties/validator";
import { updateOrg } from "../../../Redux/Actions/org.action";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";
import { useHistory } from "react-router-dom";

const OrganizationEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orgRed = useSelector((state) => state.org);
  const { org } = props.location.state;
  const [name, setName] = useState(org.name);
  const [email, setEmail] = useState(org.email);
  const [phoneNumber, setPhoneNumber] = useState(org.phoneNumber);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (orgRed.message) {
      history.push("/organization");
    }
    if (orgRed.error) {
    }
  }, [orgRed.message, orgRed.error]);
  useEffect(() => {
    if (orgRed.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [orgRed.loading]);

  const onUpdate = (e) => {
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
      id: org._id,
    };

    if (Validation(valData, validationRules)) {
      dispatch(updateOrg(data));
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
      <Card className="organization_edit">
        <Toast success={orgRed.message} error={orgRed.error} />
        <Loader showLoader={showLoader} />
        <Card.Header>
          <Card.Title as="h3">Update Organization</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Col>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Password"
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
                    type="email"
                    value={phoneNumber}
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errorPhone ? (
                    <p style={{ color: "#c94040" }}>{errorPhone}</p>
                  ) : null}
                </Form.Group>
              </Row>

              <Button variant="primary" onClick={onUpdate}>
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
            </Col>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrganizationEdit;
