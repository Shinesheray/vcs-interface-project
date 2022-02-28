import React from "react";
import RepoCommits from "./RepoCommits";
import "../css/Repos.css";

export default function Repos(props) {
  const { repos } = props;

  // Map repos
  let repo = repos.map((item, index) => {
    return (
      <div key={index}>
        <div className="repo-block">
          {/* Repo details Section */}
          <div className="repo-heading">
            {/* Show "No Description" if none */}
            <p>
              {item.repoName} <br></br>{" "}
              <span className="repo-desc">
                {item.repoDesc === undefined ? "No Description" : item.repoDesc}
              </span>
            </p>
            <div className="date-created-div">
              <p>Created - {item.createdOn}</p>
            </div>
          </div>
          {/* Commit section */}
          <div className="repo-commit-heading">
            <p>Commit History</p>
          </div>
          {/* Details div, to the right of the image */}
          <div className="repo-commits">
            <RepoCommits commitMsg={item.commitMsg} />
          </div>
        </div>
      </div>
    );
  });

  return <div>{repo}</div>;
}
