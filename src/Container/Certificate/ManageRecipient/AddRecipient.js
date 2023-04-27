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
import { addReci } from "../../../Redux/Actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";
import { AiFillEdit } from "react-icons/ai";

const AddRecipient = (props) => {
  const { certificate } = props.location.state;
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [addressOneError, setAddressOneError] = useState("");
  const [addressTwoError, setAddressTwoError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [issuerEmail, setIssuerEmail] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [attribute, setAttribute] = useState([]);
  const [valueSetter, setValueSetter] = useState({ fieldName: "", value: "" });
  const [certAttrValue, setCertAttrValue] = useState([]);
  const [modalError, setModalError] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  useEffect(() => {
    if (user.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [user.loading]);
  useEffect(() => {
    if (certificate) {
      if (certificate.data) {
        setData(certificate.data);
      }
    }
  }, [certificate]);

  useEffect(() => {
    if (user.message) {
      history.push("/manageReci", { certificate });
    }
    if (user.error) {
    }
  }, [user.message, user.error]);
  useEffect(() => {
    if (certificate.attributes) {
      certificate.attributes.map((data) => {
        attribute.push({
          key: data,
          value: "",
        });
      });
    }
  }, [certificate]);
  /*useEffect(() => {
    let arr = [];
    if (data) {
      for (var i = 0; i < data.length; i++) {

        const datal = data[i].id.replace(/\d+/g, "");
        if (datal === "recipientNameId") {
          setRecipientName("No value currently...");
        }
        if (datal === "recipientEmailId") {
          setRecipientEmail("No value currently...");
        }
        if (datal === "issueDateId") {
          setIssueDate("No value currently...");
        }
        if (datal === "issueDateId") {
          setIssueDate("No value currently...");
        }
        if (datal === "expiryDateId") {
          setExpiryDate("No value currently...");
        }
        if (datal === "issuerNameId") {
          setIssuerName("No value currently...");
        }
        if (datal === "issuerEmailId") {
          setIssuerEmail("No value currently...");
        }
        if (datal === "certificateIdId") {
          setCertificateId("No value currently...");
        }

        if (datal === "attributeId") {
          //let arr = [...attribute];
          switch (data[i].value) {
            case "name":
              arr.push({
                attributeName: "Name",
                value: "No value currently...",
              });
              break;
            case "email":
              arr.push({
                attributeName: "Email",
                value: "No value currently...",
              });
              break;
            case "addressOne":
              arr.push({
                attributeName: "AddressOne",
                value: "No value currently...",
              });
              break;
            case "city":
              arr.push({
                attributeName: "City",
                value: "No value currently...",
              });
              break;
            case "addressTwo":
              arr.push({
                attributeName: "AddressTwo",
                value: "No value currently...",
              });
              break;
            case "state":
              arr.push({
                attributeName: "State",
                value: "No value currently...",
              });
              break;
            case "country":
              arr.push({
                attributeName: "Country",
                value: "No value currently...",
              });
              break;
            case "zipCode":
              arr.push({
                attributeName: "ZipCode",
                value: "No value currently...",
              });
              break;
            case "company":
              arr.push({
                attributeName: "Company",
                value: "No value currently...",
              });
              break;
            default:
              arr.push({
                attributeName: data[i].value,
                value: "No value currently...",
              });
          }
        }
      }
    }
    setAttribute(arr);
  }, [data]);*/

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
    setError("");
  };
  const attributeSetter = () => {
    let arr = [];
    if (issueDate) {
      arr.push({
        key: "Issue Date",
        value: issueDate,
      });
    }
    if (expiryDate) {
      arr.push({
        key: "Expiry Date",
        value: expiryDate,
      });
    }
    if (recipientName) {
      arr.push({
        key: "Recipient Name",
        value: recipientName,
      });
    }
    if (recipientEmail) {
      arr.push({
        key: "Recipient Email",
        value: recipientEmail,
      });
    }

    if (issuerName) {
      arr.push({
        key: "Issuer Name",
        value: issuerName,
      });
    }
    if (issuerEmail) {
      arr.push({
        key: "Issuer Email",
        value: issuerEmail,
      });
    }
    if (certificateId) {
      arr.push({
        key: "Certificate Id",
        value: certificateId,
      });
    }
    attribute.map((data) => {
      arr.push({
        key: data.attributeName,
        value: data.value,
      });
    });
    setCertAttrValue(arr);
    return arr;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    clearError();
    const res = await attributeSetter();
    if (res) {
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
        name: name,
        company: company,
        email: email,
        addressOne: addressOne,
        addressTwo: addressTwo,
        country: country,
        state: state,
        city: city,
        zipCode: zipCode,
        certificateId: certificate._id,
        certAttrValue: attribute,
      };

      if (Validation(data, validationRules)) {
        dispatch(addReci(dataToSend));
      }
    } else {
      setError("Enter all fields");
    }
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

  const handleDialog = (field, value) => {
    setValueSetter({
      fieldName: field,
      value: value,
    });

    handleShow();
  };
  const handleEdit = (valueSetter, value) => {
    if (value !== null && value !== "No value currently..." && value !== "") {
      attribute.map((data) => {
        if (data.key === valueSetter.fieldName) {
          data.value = value;
        }
      });
      handleClose();
      setAttributeValue("");
    } else {
      setModalError("Plesae enter value");
    }
  };
  return (
    <div className="AddReci">
      <Toast success={user.message} error={user.error} />
      <Loader showLoader={showLoader} />
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h3">Add recipient</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleAdd}>
              <Row>
                {error ? <p style={{ color: "#c94040" }}>{error}</p> : null}
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
              <br />
              <Table striped bordered hover className="dateTable">
                <tbody>
                  {attribute
                    ? attribute.map((data, index) => (
                        <tr>
                          <th>{data.key}</th>
                          <th>
                            {!data.value ? "No value currently..." : data.value}
                          </th>
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
                Add
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={() => history.push("/manageReci", { certificate })}
                style={{ float: "right" }}
              >
                Back
              </Button>
              <div className="clearfix"></div>
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
                <Row>
                  {modalError ? (
                    <p style={{ color: "#c94040" }}>{modalError}</p>
                  ) : null}
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

export default AddRecipient;
