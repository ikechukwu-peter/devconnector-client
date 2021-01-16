import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

function EditProfile() {
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [handle, setHandle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [githubusername, setGithubUsername] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [errors, setErrors] = useState({});

  //useselector
  const stateProfile = useSelector((state) => state.profile);
  const allErrors = useSelector((state) => state.errors);

  //dispatch and history
  //************* */
  const dispatch = useDispatch();
  const history = useHistory();

  //****************** */
  useLayoutEffect(() => {
    dispatch(getCurrentProfile());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allErrors) {
      setErrors(allErrors);
    }

    if (stateProfile.profile) {
      const profile = stateProfile.profile;
      //change skills back to CSV
      const skillsCSV = profile.skills.join(",");

      //if prfoile fieldsdeosnt exists make an empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      //Setstate
      setHandle(profile.handle);
      setStatus(profile.status);
      setCompany(profile.company);
      setWebsite(profile.website);
      setSkills(skillsCSV);
      setLocation(profile.location);
      setGithubUsername(profile.githubusername);
      setBio(profile.bio);
      setTwitter(profile.twitter);
      setFacebook(profile.facebook);
      setYoutube(profile.youtube);
      setInstagram(profile.instagram);
      setLinkedin(profile.linkedin);
    }
    // eslint-disable-next-line
  }, [stateProfile.profile, errors]);

  function onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle,
      company,
      skills,
      website,
      bio,
      githubusername,
      location,
      status,
      twitter,
      facebook,
      youtube,
      instagram,
      linkedin,
    };
    dispatch(createProfile(profileData, history));
  }

  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "* Developer", value: "Developer" },
    { label: "* Junior Developer", value: "Junior Developer" },
    { label: "* Senior Devloper", value: "Senior Developer" },
    { label: "* Manager", value: "Student or Learning" },
    { label: "* Intern", value: "Intern" },
    { label: "* Other", value: "Other" },
  ];
  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          name="twitter"
          placeholder="Twitter Profile URL"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          icon="fab fa-twitter"
          errors={errors.twitter}
        />
        <InputGroup
          name="facebook"
          placeholder="Facebook Page URL"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          icon="fab fa-facebook"
          errors={errors.facebook}
        />
        <InputGroup
          name="linkedin"
          placeholder="Linkedin Profile URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          icon="fab fa-linkedin"
          errors={errors.linkedin}
        />
        <InputGroup
          name="youtube"
          placeholder="Youtube Channel URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          icon="fab fa-youtube"
          errors={errors.youtube}
        />
        <InputGroup
          name="instagram"
          placeholder="Instagram Page URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          icon="fab fa-instagram"
          errors={errors.instagram}
        />
      </div>
    );
  }
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <small className="d-block pb-3">* = required field</small>

            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile handle"
                name="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                error={errors.handle}
                info=" A unique handle for your profile URL. Your full name, company
                    name, nickname, etc"
              />
              <SelectListGroup
                placeholder="* Status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={options}
                error={errors.status}
                info=" Give us an idea of where you are in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                error={errors.company}
                info=" Could be your own company or one you worked for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={errors.website}
                info="Could be one you own or worked for"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
                info=" City or city & state suggested (eg, Ikoyi, Lagos)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                error={errors.skills}
                info=" Please use comma separated values (eg Python, Javascript, HTML, CSS, etc) "
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githibusername"
                value={githubusername}
                onChange={(e) => setGithubUsername(e.target.value)}
                error={errors.githubusername}
                info=" If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="A short bio about yourself"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                error={errors.bio}
                info=" Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setDisplaySocialInputs(!displaySocialInputs);
                  }}
                  className="btn btn-light"
                >
                  Add Social Networks Links
                </button>
                <span className="text-muted"> Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
