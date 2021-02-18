import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import { getProfileByHandle } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

function Profile({ getProfileByHandle, match, profile: { profile, loading } }) {
  useLayoutEffect(() => {
    getProfileByHandle(match.params.handle);
  }, [getProfileByHandle, match.params.handle]);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
        </div>
        <div className="col-md-6"></div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />

        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    );
  }
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
}
Profile.propTypes = {
  profile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
