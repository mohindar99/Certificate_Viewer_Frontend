import React, { useState, useEffect } from "react";
import "../../Assets/Styles/main.css";
import { useSelector, useDispatch } from "react-redux";
import { forgot } from "../../Redux/Actions/auth.action";
import { Link } from "react-router-dom";
import RouteRules from "../../Routes/RouteRules";
import { validate } from "../../Utililties/validator";
import validationRules from "../../Utililties/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";
import { useHistory } from "react-router-dom";

const ForgotPass = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.loading) {
      clearError();
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [auth.loading]);

  useEffect(() => {
    if (auth.message) {
      history.push("/");
    }
    if (auth.error) {
    }
  }, [auth.message, auth.error]);

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
      dispatch(forgot(data));
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
      <Toast success={auth.message} error={auth.error} />
      <Loader showLoader={showLoader} />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 logo">
              <img className="logoimg" src="badge.png" alt="logo" />
            </div>
            <div className="col-lg-12 login-title">Forgot Password</div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={onSubmitting}>
                  <div className="form-group">
                    <label className="form-label">EMAIL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter registered email to receive reset link"
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
                        SUBMIT
                      </button>
                    </div>
                    <div className="label-forgot">
                      <Link to={RouteRules.loginPage}>
                        <label className="label-forgot">Login</label>
                      </Link>
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

export default ForgotPass;
