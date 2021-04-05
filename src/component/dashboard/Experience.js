import React from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

function Experience({ experience }) {
  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(deleteExperience(id));
  };

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
          {experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                {exp.to === null ? (
                  " Now"
                ) : (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={(e) => onDeleteClick(exp._id)}
                  className="btn btn-danger"
                >
                  {" "}
                  Delete{" "}
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}

export default Experience;
