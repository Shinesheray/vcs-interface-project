import React from "react";
import Github from "./Github";
import GitLab from "./GitLab";
import Bitbucket from "./Bitbucket";
import "../css/Profile.css";

function Profile({ accounts, vcsChosen }) {
  // Switch case for vcs
  // If no vcs has been chosen yet then the instructions page is shown
  switch (vcsChosen) {
    case 0:
      // Returns the github profile template
      return (
        <div className="profile-div">
          <Github accounts={accounts} vcsChosen={vcsChosen} />
        </div>
      );
    case 1:
      // Returns the gitlab profile template
      return (
        <div className="profile-div">
          <GitLab accounts={accounts} vcsChosen={vcsChosen} />
        </div>
      );
    case 2:
      // Returns the bitbucket profile template
      return (
        <div className="profile-div">
          <Bitbucket accounts={accounts} vcsChosen={vcsChosen} />
        </div>
      );
    default:
      // returns blank
      return <></>;
  }
}

export default Profile;
