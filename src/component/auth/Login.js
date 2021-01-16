import React, { useState, useEffect, useLayoutEffect } from "react";
//import { Link, Redirect } from "react-router-dom";
//import classnames from "classnames";
//import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({ email: "", password: "" });

  //********************** */
  let errors = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);

  //Dispatching
  const dispatch = useDispatch();
  //history
  const history = useHistory();

  //**************************** */
  //componentdidupdate
  useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  //Component will receivde props
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
    if (errors) {
      setErrors({ error: errors });
    }
    // eslint-disable-next-line
  }, [auth.isAuthenticated, errors]);

  function onSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  }
  //errors = state.errors;
  //  onChange={(e) => setEmail(e.target.value)}
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="email"
                type="email"
                value={email}
                placeholder="Email Address"
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextFieldGroup
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                error={errors.password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };
export default Login;
