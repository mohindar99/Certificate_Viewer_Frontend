import React, { useState, useEffect } from "react";
import "../../Assets/Styles/main.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RouteRules from "../../Routes/RouteRules";
import { validate } from "../../Utililties/validator";
import validationRules from "../../Utililties/validation";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Spinner } from "react-bootstrap";
import { loginUser } from "../../Redux/Actions/user.action";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";

const UserLogin = () => {
  const user = useSelector((state) => state.user);
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.loading) {
      clearError();
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [user.loading]);

  useEffect(() => {
    if (user.message) {
    }
    if (user.error) {
    }
  }, [user.message, user.error]);

  const clearError = () => {
    setErrorEmail("");
  };

  const onSubmitting = (e) => {
    e.preventDefault();
    let data = {
      email,
    };
    clearError();
    if (Validation(data, validationRules)) {
      dispatch(loginUser(data));
    }
  };
  const Validation = (Field, Rule) => {
    let res = validate(Field, Rule);
    if (res.errors) {
      if (res.errors.email) {
        setErrorEmail(res.errors.email);
      }
    }
    return res.isValid;
  };

  return (
    <div>
      <Toast success={user.message} error={user.error} />
      <Loader showLoader={showLoader} />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 logo">
              <img className="logoimg" src="badge.png" alt="logo" />
            </div>
            <div className="col-lg-12 login-title">WELCOME BACK</div>
            <p className="para1">
              YAYA, you are back. Login into your account to access the features
            </p>
            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={onSubmitting}>
                  <div className="form-group">
                    <label className="form-control-label">EMAIL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter registered email address to login"
                      label="UserName"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorEmail ? (
                      <p style={{ color: "#c94040" }}>{errorEmail}</p>
                    ) : null}
                  </div>

                  <div className="forgot">
                    <div className="col-lg-1 login-btm login-button">
                      <button type="submit" className="btn-outline-primary">
                        LOGIN
                      </button>
                    </div>
                    <div className="label-forgot">
                      <Link to={RouteRules.loginPage}>
                        <label className="label-forgot">Admin Login here</label>
                      </Link>
                    </div>
                    <div className="email-contact">
                      <p className="email-contact-detail">
                        If you don't have access to your email please contact :{" "}
                        <label className="contact-email">
                          admin@mydocuview.com
                        </label>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
