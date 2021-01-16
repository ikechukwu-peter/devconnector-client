import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileActions";

function AddEducation() {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldofstudy, setFieldofstudy] = useState("");
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
  console.log(allErrors);
  /*************************** */
  useEffect(() => {
    if (allErrors) {
      setErrors(allErrors);
    }
  }, [allErrors]);

  function onSubmit(e) {
    e.preventDefault();
    const eduData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      current,
    };
    dispatch(addEducation(eduData, history));
  }

  function onCheck() {
    setCurrent(!current);
    setDisabled(!disabled);
  }

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center ">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3 text-warn"> *= required</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School or Bootcamp"
                name="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder=" * Degree or Certificate"
                name="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={(e) => setFieldofstudy(e.target.value)}
                error={errors.fieldofstudy}
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
                  Current Education
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Education Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
                info="Program Description"
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

export default AddEducation;
