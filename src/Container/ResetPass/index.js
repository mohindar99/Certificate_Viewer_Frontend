import React, { useState, useEffect } from "react";
import "../../Assets/Styles/main.css";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../Redux/Actions/auth.action";
import { Link } from "react-router-dom";
import RouteRules from "../../Routes/RouteRules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "../../Utililties/validator";
import validationRules from "../../Utililties/validation";
import { Spinner } from "react-bootstrap";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";
const ResetPass = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorPassCon, setErrorPassCon] = useState("");
  const auth = useSelector((state) => state.auth);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useParams();
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
    setErrorPass("");
    setErrorPassCon("");
    setError("");
  };
  const onReset = (e) => {
    clearError();
    e.preventDefault();

    if (password === confirm_password) {
      let data = {
        id: token,
        password,
      };
      let field = {
        password,
      };
      if (Validation(field, validationRules)) {
        dispatch(reset(data));
      }
    } else {
      setError("Password and Confirm Password do not match");
    }
  };
  const Validation = (Field, Rule) => {
    let res = validate(Field, Rule);

    if (res.errors) {
      if (res.errors.password) {
        setErrorPass(res.errors.password);
      }
      if (res.errors.confirm_password) {
        setErrorPassCon(res.errors.confirm_password);
      }
    }
    return res.isValid;
  };

  return (
    <div>
      <Toast success={auth.message} error={auth.error} />
      <Loader showLoader={showLoader} />
      <div className="login_container">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 logo">
                <img className="logoimg" src="/badge.png" alt="logo" />
              </div>
              <div className="col-lg-12 login-title">Reset Password</div>
              {error ? <p style={{ color: "#c94040" }}>{error}</p> : null}
              <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                  <form onSubmit={onReset}>
                    <div className="form-group">
                      <label className="form-control-label">NEW PASSWORD</label>
                      <div className="pass-div">
                        <input
                          type={isRevealPwd ? "text" : "password"}
                          className="form-control"
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          className={
                            isRevealPwd ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                          onClick={() =>
                            setIsRevealPwd((prevState) => !prevState)
                          }
                        />
                      </div>

                      {errorPass ? (
                        <p style={{ color: "#c94040" }}>{errorPass}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">
                        CONFIRM PASSWORD
                      </label>
                      <div className="pass-div">
                        <input
                          type={isRevealPwd ? "text" : "password"}
                          className="form-control"
                          label="Password"
                          value={confirm_password}
                          onChange={(e) => setConfirm(e.target.value)}
                        />
                        <i
                          className={
                            isRevealPwd ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                          onClick={() =>
                            setIsRevealPwd((prevState) => !prevState)
                          }
                        />
                      </div>

                      {errorPassCon ? (
                        <p style={{ color: "#c94040" }}>{errorPassCon}</p>
                      ) : null}
                    </div>

                    <div className="forgot">
                      <div className="col-lg-1 login-btm login-button">
                        <button type="submit" className=" btn-outline-primary">
                          RESET
                        </button>
                      </div>
                      <div className="label-forgot">
                        <Link to={RouteRules.forgotPassword}>
                          <label className="label-forgot">
                            Forgot Password?
                          </label>
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
    </div>
  );
};

export default ResetPass;
