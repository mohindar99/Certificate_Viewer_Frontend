import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Col,
  Form,
  Row,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { validate } from "../../../Utililties/validator";
import validationRules from "../../../Utililties/validation";
import {
  addReci,
  updateUser,
  getReciDetails,
} from "../../../Redux/Actions/user.action";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";
import { CardBody } from "reactstrap";

const UpdateRecipient = (props) => {
  const { userData, certificate } = props.location.state;
  const history = useHistory();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoader, setShowLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [company, setCompany] = useState(userData.company);
  const [addressOne, setAddressOne] = useState(userData.addressOne);
  const [addressTwo, setAddressTwo] = useState(userData.addressTwo);
  const [state, setState] = useState(userData.state);
  const [country, setCountry] = useState(userData.country);
  const [city, setCity] = useState(userData.city);
  const [zipCode, setZipCode] = useState(userData.zipCode);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [addressOneError, setAddressOneError] = useState("");
  const [addressTwoError, setAddressTwoError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [data, setData] = useState([]);
  const newdata = user.user;
  const [issuerName, setIssuerName] = useState("");
  const [issuerEmail, setIssuerEmail] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [attribute, setAttribute] = useState([]);
  const [valueSetter, setValueSetter] = useState({ fieldName: "", value: "" });
  const [attributeValue, setAttributeValue] = useState("");
  const [certAttrValue, setCertAttrValue] = useState([]);

  useEffect(() => {
    if (certificate) {
      if (certificate.data) {
        setData(certificate.data);
      }
    }
  }, [certificate]);
  useEffect(() => {
    let id = userData._id;
    dispatch(getReciDetails(id));
  }, [userData]);
  useEffect(() => {
    if (user.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [user.loading]);
  useEffect(() => {
    if (newdata) {
      setCompany(newdata.company);
      setAddressOne(newdata.addressOne);
      setAddressTwo(newdata.addressTwo);
      setCity(newdata.city);
      setState(newdata.state);
      setCountry(newdata.country);
      setZipCode(newdata.zipCode);
      setCertAttrValue(newdata.certAttrValue);
    }
  }, [newdata]);

  useEffect(() => {
    if (user.message) {
      history.push("/manageReci", { certificate });
    }
    if (user.error) {
    }
  }, [user.message, user.error]);

  const clearError = () => {
    setNameError("");
    setCompanyError("");
    setEmailError("");
    setAddressOneError("");
    setAddressTwoError("");
    setCountryError("");
    setCityError("");
    setStateError("");
    setZipCodeError("");
  };
  const handleDialog = (field, value) => {
    setValueSetter({
      fieldName: field,
      value: value,
    });
    handleShow();
  };
  /*useEffect(() => {
    
    if (certAttrValue) {
      let attrArr = []
    certificate.attributes.map((data) => {
    
      if (!certAttrValue.find((item) => item.key === data)) {
          certAttrValue.push({
            key: data,
            value: '',
            _id:''
          })
        }
       
     
    })
    
    }
  }, [certAttrValue,certificate])*/
  const handleAdd = (e) => {
    e.preventDefault();
    clearError();
    let data = {
      nameReci: name,
      company,
      email,
      addressOne,
      addressTwo,
      country,
      state,
      city,
      zipCode,
    };
    let dataToSend = {
      name,
      company,
      email,
      addressOne,
      addressTwo,
      country,
      state,
      city,
      zipCode,
      certAttrValue,
      certificateId: certificate._id,
      id: userData._id,
    };

    if (Validation(data, validationRules)) {
      if (checkUndefined(data)) {
        dispatch(updateUser(dataToSend));
      }
    }
  };
  const checkUndefined = (data) => {
    let isValid = true;

    if (data.nameReci === undefined) {
      setNameError("Name required");
      isValid = false;
    }
    if (data.company === undefined) {
      setCompanyError("Company name required");
      isValid = false;
    }
    // if (data.addressOne === undefined) {
    //   setAddressOneError("Address One required");
    //   isValid = false;
    // }
    // if (data.addressTwo === undefined) {
    //   setAddressTwoError("Address Two required");
    //   isValid = false;
    // }
    if (data.country === undefined) {
      setCountryError("Country required");
      isValid = false;
    }
    if (data.state === undefined) {
      setStateError("State required");
      isValid = false;
    }
    if (data.city === undefined) {
      setCityError("State required");
      isValid = false;
    }
    if (data.zipCode === undefined) {
      setZipCodeError("ZipCode required");
      isValid = false;
    }
    return isValid;
  };
  const Validation = (Field, Rule) => {
    let res = validate(Field, Rule);
    const { errors } = res;
    if (errors) {
      if (errors.nameReci) {
        setNameError(errors.nameReci);
      }
      if (errors.company) {
        setCompanyError(errors.company);
      }
      if (errors.email) {
        setEmailError(errors.email);
      }
      if (errors.addressOne) {
        setAddressOneError(errors.addressOne);
      }
      if (errors.addressTwo) {
        setAddressTwoError(errors.addressTwo);
      }
      if (errors.country) {
        setCountryError(errors.country);
      }
      if (errors.state) {
        setStateError(errors.state);
      }
      if (errors.city) {
        setCityError(errors.city);
      }
      if (errors.zipCode) {
        setZipCodeError(errors.zipCode);
      }
    }
    return res.isValid;
  };

  const handleEdit = (valueSetter, value) => {
    certAttrValue.map((data) => {
      if (data.key === valueSetter.fieldName) {
        data.value = value;
      }
    });
    handleClose();
    setAttributeValue("");
  };
  return (
    <div className="AddReci">
      <Toast success={user.message} error={user.error} />
      <Loader showLoader={showLoader} />
      <Container fluid>
        <Card className="updateRecipient">
          <Card.Header>
            <Card.Title as="h3">Update recipient</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleAdd}>
              <Row>
                <Col>
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                      value={name}
                      placeholder="Name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    {nameError ? (
                      <p style={{ color: "#c94040" }}>{nameError}</p>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <label>Company</label>
                    <Form.Control
                      value={company}
                      placeholder="Company"
                      type="text"
                      onChange={(e) => setCompany(e.target.value)}
                    ></Form.Control>
                    {companyError ? (
                      <p style={{ color: "#c94040" }}>{companyError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <label>Email</label>
                    <Form.Control
                      value={email}
                      placeholder="Email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    {emailError ? (
                      <p style={{ color: "#c94040" }}>{emailError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Address 1</label>
                    <Form.Control
                      value={addressOne}
                      placeholder="Address 1"
                      type="text"
                      onChange={(e) => setAddressOne(e.target.value)}
                    ></Form.Control>
                    {addressOneError ? (
                      <p style={{ color: "#c94040" }}>{addressOneError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Address 2</label>
                    <Form.Control
                      value={addressTwo}
                      placeholder="Address 2"
                      type="text"
                      onChange={(e) => setAddressTwo(e.target.value)}
                    ></Form.Control>
                    {addressTwoError ? (
                      <p style={{ color: "#c94040" }}>{addressTwoError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <label>Country</label>
                    <Form.Control
                      value={country}
                      placeholder="Country"
                      type="text"
                      onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                    {countryError ? (
                      <p style={{ color: "#c94040" }}>{countryError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <label>State</label>
                    <Form.Control
                      value={state}
                      placeholder="State"
                      type="text"
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                    {stateError ? (
                      <p style={{ color: "#c94040" }}>{stateError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <label>City</label>
                    <Form.Control
                      value={city}
                      placeholder="City"
                      type="text"
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                    {cityError ? (
                      <p style={{ color: "#c94040" }}>{cityError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <label>ZipCode</label>
                    <Form.Control
                      value={zipCode}
                      placeholder="ZipCode"
                      type="text"
                      onChange={(e) => setZipCode(e.target.value)}
                    ></Form.Control>
                    {zipCodeError ? (
                      <p style={{ color: "#c94040" }}>{zipCodeError}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <div className="clearfix"></div>

              <br />
              <Table striped bordered hover className="dateTable">
                <tbody>
                  {certAttrValue
                    ? certAttrValue.map((data, index) => (
                        <tr key={index}>
                          <th>{data.key}</th>
                          <th>{data.value}</th>
                          <th>
                            <AiFillEdit
                              className="icon-action"
                              onClick={() => handleDialog(data.key, data.value)}
                            />
                          </th>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>

              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
              >
                Update
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={() => history.push("/manageReci", { certificate })}
                style={{ float: "right" }}
              >
                Back
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>Update Certificate Attribute</Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <label>Field Name</label>
                  </Col>
                  <Col>
                    <p>{valueSetter.fieldName}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label>Value</label>
                  </Col>
                  <Col>
                    <p>{valueSetter.value}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Enter Value</label>
                  </Col>
                  <Col>
                    <input
                      value={attributeValue}
                      placeholder="Enter the value here"
                      onChange={(e) => setAttributeValue(e.target.value)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEdit(valueSetter, attributeValue)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default UpdateRecipient;
