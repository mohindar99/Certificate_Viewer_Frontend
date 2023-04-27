import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../Utililties/utilities";
import "../Assets/Styles/main.css";
import Toast from "../Component/Toast";
import Loader from "../Component/Loader";
// import {AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { updateAdmin } from "../Redux/Actions/auth.action";

const User = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const data = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(data.fullName);
  const [image, setImage] = useState("");
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorOldPass, setErrorOldPass] = useState("");
  const [errorConPass, setErrorConPass] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [rawImage, setRawImage] = useState();
  const [imageFile, setImageFile] = React.useState({} | null);
  const [showLoader, setShowLoader] = useState(false);
  const [oldPassEye, setOldPassEye] = useState(false);
  const [oldNewEye, setNewPassEye] = useState(false);
  const [oldCnfEye, setCnfPassEye] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      setError("");
      setErrorConPass("");
      setErrorOldPass("");
      setErrorFullName("");
      setErrorPass("");
    }
  }, [auth.loading]);

  useEffect(() => {
    if (auth.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [auth.loading]);
  useEffect(() => {
    if (auth.message) {
    }
    if (auth.error) {
    }
  }, [auth.message, auth.error]);

  const clearError = () => {
    setError("");
    setErrorConPass("");
    setErrorOldPass("");
    setErrorFullName("");
    setErrorPass("");
  };
  const handleImage = async (e) => {
    let file = e.target.files[0];

    setImageFile(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setRawImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    clearError();
    var detail = fullName.split(" ");
    var firstName = detail[0];
    var lastName = detail[1];
    if (password || oldPassword || confirmPassword) {
      var dataUser = {
        fullName,
        password,
        oldPassword,
        confirmPassword,
      };
      if (ValidationWithPass(dataUser)) {
        if (imageFile) {
          let imageUrl = await uploadImage(imageFile);

          setImage(imageUrl.location);
          let update = {
            firstName,
            lastName,
            email: data.email,
            newPassword: password,
            oldPassword,
            image: imageUrl.location,
          };
          dispatch(updateAdmin(update, data._id));
        } else {
          let update = {
            firstName,
            lastName,
            email: data.email,
            newPassword: password,
            oldPassword,
          };
          dispatch(updateAdmin(update, data._id));
        }
      }
    } else {
      if (fullName) {
        if (imageFile) {
          let imageUrl = await uploadImage(imageFile);
          setImage(imageUrl.location);
          let update = {
            firstName,
            lastName,
            email: data.email,
            image: imageUrl.location,
          };
          dispatch(updateAdmin(update, data._id));
        } else {
          let update = {
            firstName,
            lastName,
            email: data.email,
          };

          dispatch(updateAdmin(update, data._id));
        }
      } else {
        setErrorFullName("Enter full name");
      }
    }
  };

  const ValidationWithPass = (data) => {
    let isValid = true;
    if (data.fullName) {
      if (data.password && data.oldPassword && data.confirmPassword) {
        if (data.password.length >= 8 && data.password.length < 15) {
          if (data.oldPassword.length >= 8 && data.oldPassword.length < 15) {
            if (data.password === data.confirmPassword) {
              isValid = true;
            } else {
              isValid = false;
              setError("Password and confirm password did not match.");
            }
          } else {
            isValid = false;
            setErrorOldPass("Must have atleast 8-15 character");
          }
        } else {
          isValid = false;
          setErrorPass("Must have atleast 8-15 character");
        }
      } else {
        isValid = false;
        setError("Please fill all the password field");
      }
    } else {
      isValid = false;
      setErrorFullName("Enter fullName");
    }
    return isValid;
  };

  return (
    <>
      <Toast success={auth.message} error={auth.error} />
      <Loader showLoader={showLoader} />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="organization_edit">
              <Card.Header>
                <Card.Title as="h4">Update Admin</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <br />
                  <Row>
                    <h>Edit Profile</h>
                  </Row>
                  <br />
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Full Name</label>
                        <Form.Control
                          value={fullName}
                          placeholder="Company"
                          type="text"
                          onChange={(e) => setFullName(e.target.value)}
                        ></Form.Control>
                        {errorFullName ? (
                          <p style={{ color: "#c94040" }}>{errorFullName}</p>
                        ) : null}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          disabled
                          defaultValue={data.email}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Picture</label>
                        <Form.Control
                          placeholder="Choose file"
                          accept="image/*"
                          type="file"
                          onChange={handleImage}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      {rawImage ? (
                        <img
                          src={rawImage}
                          alt="user"
                          className="imageProfile"
                        />
                      ) : null}
                    </Col>
                  </Row>

                  <Row>
                    <h>Change Password</h>
                  </Row>
                  {error ? <p style={{ color: "#c94040" }}>{error}</p> : null}
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Old Password</label>
                        <Form.Control
                          value={oldPassword}

                          placeholder="Old Password"
                          type={ oldPassEye? 'text': 'Password'}
                          
                          onChange={(e) => setOldPassword(e.target.value)}
                        ></Form.Control>
                        <i
                          id="eyeStyle"
                          className={
                            oldPassEye ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                          onClick={() =>
                            setOldPassEye((prevState) => !prevState)
                          }
                        />
                        {errorOldPass ? (
                          <p style={{ color: "#c94040" }}>{errorOldPass}</p>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>New Password</label>
                        <Form.Control
                          value={password}
                          placeholder="New Password"
                          type={ oldNewEye? 'text': 'Password'}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                         <i
                          id="eyeStyle"
                          className={
                            oldNewEye ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                          onClick={() =>
                            setNewPassEye((prevState) => !prevState)
                          }
                        />
                        {errorPass ? (
                          <p style={{ color: "#c94040" }}>{errorPass}</p>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Confirm Password</label>
                        <Form.Control
                          value={confirmPassword}
                          placeholder="Confirm Password"
                          type={ oldCnfEye? 'text': 'Password'}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                         <i
                          id="eyeStyle"
                          className={
                            oldCnfEye ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                          onClick={() =>
                            setCnfPassEye((prevState) => !prevState)
                          }
                        />
                        {errorConPass ? (
                          <p style={{ color: "#c94040" }}>{errorConPass}</p>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={submit}
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default User;
