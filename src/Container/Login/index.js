import React, { useState, useEffect } from "react";
import "../../Assets/Styles/main.css";
import { useSelector, useDispatch } from "react-redux";
import { authCheck, login } from "../../Redux/Actions/auth.action";
import { Link, Redirect } from "react-router-dom";
import RouteRules from "../../Routes/RouteRules";
import { validate } from "../../Utililties/validator";
import validationRules from "../../Utililties/validation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  const [showLoader, setShowLoader] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPass, setErrorPass] = useState("")
  const [isRevealPwd, setIsRevealPwd] = useState(false)

  const sessionId = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (sessionId && user) {
      dispatch(authCheck(sessionId, {data: user}))
    }
  }, [sessionId, user, dispatch])


  useEffect(() => {
    if (!auth.loading) {
      clearError();
    }
  }, [auth.loading]);

  useEffect(() => {
    if (auth.message) {
      setSuccess(auth.message);
    }
    if (auth.error) {
      setError(auth.error);
    }
  }, [auth.message, auth.error]);

  useEffect(() => {
    if (auth.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [auth.loading]);

  const clearError = () => {
    setError("");
    setErrorEmail("");
    setErrorPass("");
  };


  if (auth.authenticate) {
    return <Redirect to={`/dashboard`} />;
  }

  const onLogin = (e) => {
    clearError()
    e.preventDefault()
    let data = {
      email,
      password,
    };
    if (Validation(data, validationRules)) {
      dispatch(login(data))

      if (auth.error) {
        setError(auth.error)
      }
    }
  };

  // function refreshPage() {
  //   setTimeout(()=>{
  //       window.location.reload(false);
  //   }, 1);
  // }

  const Validation = (Field, Rule) => {
    let res = validate(Field, Rule);
    if (res.errors) {
      if (res.errors.email) {
        setErrorEmail(res.errors.email);
      }
      if (res.errors.password) {
        setErrorPass(res.errors.password);
      }
    }
    return res.isValid;
  }

  return (
    <div className="login_container">
      <Toast success={auth.message} error={auth.error} />
      <Loader showLoader={showLoader} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="login-box">
              <div className=" logo">
                <img className="logoimg" src="/badge.png" alt="logo" />
              </div>
              <h2 className="login-title">Login</h2>
            
              <div className="login-form">
                <div className="login-form">
                  <form onSubmit={onLogin}>
                    <div className="form-group">
                      <label className="form-label">EMAIL</label>

                      <input
                        type="text"
                        className="form-control"
                        label="UserName"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errorEmail ? (
                        <p style={{ color: "#c94040" }}>{errorEmail}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="form-label">PASSWORD</label>
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

                    <div className="forgot">
                      <div className="login-btm login-button">
                        <button type="submit" className=" btn-outline-primary">
                          LOGIN
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
