import React from "react";

function Results({ accounts, setVcsFunction, vcsChosen }) {
  // array of sites
  const resSites = ["GitHub", "GitLab", "BitBucket"];
  let counter = -1;

  // Maps the accounts prop
  let results = accounts.map((item, index) => {
    counter++;
    let assignedClass =
      counter === vcsChosen ? "result-block active-block" : "result-block";
    // Each vcs has different names in the json. So using if I can differentiate between them all
    // Stores result from query
    let resultItem;
    if (resSites[counter] === "GitHub") {
      resultItem = (
        <div
          key={index}
          className={assignedClass}
          onClick={(e) => setVcsFunction(e.target.id)}
        >
          <p className="result-title">{resSites[counter]}</p>
          {/* The onclick sends back the id ( the vcs number whech tell the program what profile to load ) */}
          {item.login === undefined ? (
            <p>User not found</p>
          ) : (
            <p className="response-name" id={counter}>
              {item.login}
            </p>
          )}
        </div>
      );
    } else if (resSites[counter] === "GitLab") {
      resultItem = (
        <div key={index} className={assignedClass}>
          <p className="result-title">{resSites[counter]}</p>
          {/* The onclick sends back the id ( the vcs number whech tell the program what profile to load ) */}
          {item.length === 0 ? (
            <p>User not found</p>
          ) : (
            <p
              className="response-name"
              id={counter}
              onClick={(e) => setVcsFunction(e.target.id)}
            >
              {item.username}
            </p>
          )}
        </div>
      );
    } else if (resSites[counter] === "BitBucket") {
      resultItem = (
        <div key={index} className={assignedClass}>
          <p className="result-title">{resSites[counter]}</p>
          {/* The onclick sends back the id ( the vcs number whech tell the program what profile to load ) */}
          {item.type === "Error" ? (
            <p>{item.reason}</p>
          ) : (
            <p
              className="response-name"
              id={counter}
              onClick={(e) => setVcsFunction(e.target.id)}
            >
              {item.nickname}
            </p>
          )}
        </div>
      );
    }
    return resultItem;
  });

  // Adds event listener to the results that assigned the active-block class
  let blocks = document.getElementsByClassName("response-name");
  for (let i in blocks.length) {
    // each block gets a event listener
    blocks[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active-block");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          " active-block",
          ""
        );
      }
      this.parentNode.className += " active-block";
    });
  }

  return <div id="result-row">{results}</div>;
}

export default Results;
