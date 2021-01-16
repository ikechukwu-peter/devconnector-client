import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

function Profiles() {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useLayoutEffect(() => {
    dispatch(getProfiles());
  }, []);
  console.log(profiles);

  let profileItems;

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      console.log(profiles);
      profileItems = profiles.map((profile) => {
        return <ProfileItem key={profile._id} profile={profile} />;
      });
    } else {
      profileItems = <h4>No profiles found ....</h4>;
    }
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developers Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
