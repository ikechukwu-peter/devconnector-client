import React from "react";
import Moment from "react-moment";

function ProfileCreds({ education, experience }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {experience.length > 0 ? (
            experience.map((exp) => (
              <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                  {exp.to === null ? (
                    " Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </p>
                <p>
                  <strong> Position: {exp.title}</strong>
                </p>
                <p>
                  {exp.location === "" ? null : (
                    <span>
                      <strong> Location: </strong> {exp.location}
                    </span>
                  )}
                </p>
                <p>
                  {exp.description === "" ? null : (
                    <span>
                      <strong> Description: </strong> {exp.description}
                    </span>
                  )}
                </p>
              </li>
            ))
          ) : (
            <p> No Experience Listed </p>
          )}
        </ul>
      </div>

      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {education.lenght > 0 ? (
            education.map((edu) => (
              <li key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                  {edu.to === null ? (
                    " Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                  )}
                </p>
                <p>
                  <strong> Degree: {edu.degree}</strong>
                </p>
                <p>
                  <strong> Field of Study: </strong> {edu.fieldofstudy}
                </p>
                <p>
                  {edu.description === "" ? null : (
                    <span>
                      <strong> Description: </strong> {edu.description}
                    </span>
                  )}
                </p>
              </li>
            ))
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileCreds;
