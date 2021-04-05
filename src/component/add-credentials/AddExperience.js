import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addExperience } from "../../actions/profileActions";

function AddExperience() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  /************************* */
  const dispatch = useDispatch();
  const history = useHistory();
  const allErrors = useSelector((state) => state.errors);
  /*************************** */
  useEffect(() => {
    if (allErrors) {
      setErrors(allErrors);
    }
  }, [allErrors]);
  function onSubmit(e) {
    e.preventDefault();
    const expData = {
      company,
      title,
      location,
      from,
      to,
      description,
      current,
    };
    dispatch(addExperience(expData, history));
  }

  function onCheck() {
    setCurrent(!current);
    setDisabled(!disabled);
  }

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center ">
              Add any job or experience that you have had in the past or currnet
            </p>
            <small className="d-block pb-3 text-warn"> *= required</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder=" *Job Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                placeholder="From"
                name="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                placeholder="To"
                name="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                error={errors.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
                info="Tell us about the position"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExperience;
