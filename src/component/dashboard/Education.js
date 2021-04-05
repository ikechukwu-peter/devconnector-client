import React from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

function Education({ education }) {
  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(deleteEducation(id));
    console.log(id);
  };
  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Description</th>
            <th>Years</th>
            <th></th>
          </tr>
          {education.map((edu) => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td>{edu.degree}</td>
              <td>{edu.fieldofstudy}</td>
              <td>{edu.decription}</td>
              <td>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                {edu.to === null ? (
                  " Now"
                ) : (
                  <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={(e) => onDeleteClick(edu._id)}
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
export default Education;
