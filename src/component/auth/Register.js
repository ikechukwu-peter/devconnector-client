import React, { useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  /*********************** */
  //From stores

  let errors = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);
  //Dispatching
  const dispatch = useDispatch();
  //history
  const history = useHistory();

  //check if user is already authenticated

  useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors) {
      setError({ error: errors });
    }
  }, [errors]);

  function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    };
    dispatch(registerUser(newUser, history));
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="name"
                type="name"
                value={name}
                placeholder="Name"
                error={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextFieldGroup
                name="email"
                type="email"
                value={email}
                placeholder="Email Address"
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
                info=" This site uses Gravatar so if you want a profile image, use a
                Gravatar email"
              />

              <TextFieldGroup
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                error={errors.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextFieldGroup
                name="Confirm Password"
                type="confirmpassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
