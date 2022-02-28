const express = require("express");
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 3001;

require("isomorphic-fetch"); // I used this method of ispmorphic fetch from tasst 16 of level 3 which I found to have helped fetching data I reqiure using epress
app.use(helmet());

//landing page to help navigate to react app
app.get("/", function (req, res) {
  res.send(`<h1>Search GitHub, GitLab, and BitBucket Accounts</h1>
        <p>Navigate to <a href="http://localhost:3000/">http://localhost:3000/</a>. To view the react app to use search.</p>
    `);
});

// Get all info about the user from github, gitlab and bitbucket
app.get("/get-user/:name", async (req, res) => {
  let userInfoArray = [];
  let username = req.params.name;

  //GitHub profile
  const post1 = await fetch("https://api.github.com/users/" + username);
  let post1Obj = await post1.json();
  userInfoArray.push(post1Obj);

  //GitLab
  const gitlabAccountId = await fetch(
    "https://gitlab.com/api/v4/users?username=" + username
  );
  const gitlabAccountIdObj = await gitlabAccountId.json();

  // If the user is not found, the empty array is pushed
  if (gitlabAccountIdObj.length === 0) {
    userInfoArray.push(gitlabAccountIdObj);
  } else {
    // Their id is used to fetch information to populate their profile information
    const gitlabAccountInfo = await fetch(
      "https://gitlab.com/api/v4/users/" + gitlabAccountIdObj[0].id
    );
    const gitlabAccountInfoObj = await gitlabAccountInfo.json();
    // Response is added to the array
    userInfoArray.push(gitlabAccountInfoObj);
  }

  //BitBucket

  /**
   * First makes call to find if there is a username
   * If username exists get users uuid.
   * If empty JSON file get respond that the user is private
   */
  // Fetch to see if there are repos associated with username
  const post3 = await fetch(
    "https://api.bitbucket.org/2.0/repositories/" + username
  );
  const post3Obj = await post3.json();
  // The check for the error ( User does not exist )
  if (post3Obj.type === "error") {
    userInfoArray.push({ type: "Error", reason: "User not found" });
  } else {
    // If the value is empty, that means all their repos are private so can't display
    if (post3Obj.values.length === 0) {
      userInfoArray.push({ type: "Error", reason: "Account is private" });
      // Else if the values key is not empty, full account is available
    } else {
      const post4 = await fetch(
        "https://api.bitbucket.org/2.0/users/" + post3Obj.values[0].owner.uuid
      );
      const post4Obj = await post4.json();
      // Response is added to the array
      userInfoArray.push(post4Obj);
    }
  }
  // userInfoArray sent back to react app
  res.send(userInfoArray);
});

// GitHub Repo
app.get("/user/github/repo/:name", async (req, res) => {
  let repoArray = [];
  let repoObj;
  let username = req.params.name;

  //Get the last 5 repos
  const repos = await fetch(
    "http://api.github.com/users/" +
      username +
      "/repos?per_page=" +
      5 +
      "&sort=create"
  );
  let reposJson = await repos.json();
  repoObj = reposJson;

  // Fetch 5 last commits
  // The first loop gets the repo commits details for a repo
  for (let index = 0; index < repoObj.length; index++) {
    let repoCommits = await fetch(
      "https://api.github.com/repos/" +
        username +
        "/" +
        repoObj[index].name +
        "/commits?per_page=5"
    );
    let commits = await repoCommits.json();

    // Object is created and initialized
    let repoInfoObj = new Object();
    repoInfoObj.repoName = repoObj[index].name;
    repoInfoObj.repoDesc = repoObj[index].description;
    repoInfoObj.createdOn = repoObj[index].created_at.substr(0, 10);
    repoInfoObj.commitMsg = [];

    //This loop runs through the previouse fetch results picking out the commit messages
    for (let index2 = 0; index2 < commits.length; index2++) {
      repoInfoObj.commitMsg.push(commits[index2].commit.message);
    }
    // The object is the pushed to arr
    repoArray.push(repoInfoObj);
  }
  // Send repoArray
  res.send(repoArray);
});

// GetLab Repo
app.get("/user/gitlab/repo/:name", async (req, res) => {
  let repoArray = [];
  let repoObj;
  let username = req.params.name;

  //Gets the last 5 repos by creation date
  const repos = await fetch(
    "https://gitlab.com/api/v4/users/" + username + "/projects?per_page=" + 5
  );
  let reposJson = await repos.json();
  repoObj = reposJson;

  // The first loop gets the repo commits details for a repo
  for (let index = 0; index < repoObj.length; index++) {
    let repoCommits = await fetch(
      "https://gitlab.com/api/v4/projects/" +
        repoObj[index].id +
        "/repository/commits?per_page=5"
    );
    let commits = await repoCommits.json();

    // Object is created and initialized
    let repoInfoObj = new Object();
    repoInfoObj.repoName = repoObj[index].name;
    repoInfoObj.repoDesc = repoObj[index].description;
    repoInfoObj.createdOn = repoObj[index].created_at.substr(0, 10);
    repoInfoObj.commitMsg = [];

    //This loop runs through the previouse fetch results picking out the commit messages
    for (let index2 = 0; index2 < commits.length; index2++) {
      repoInfoObj.commitMsg.push(commits[index2].title);
    }
    // The object is the pushed to repoArray
    repoArray.push(repoInfoObj);
  }
  // repoArray displayed
  res.send(repoArray);
});

// BitBuck Repos
app.get("/user/bitbucket/repo/:name", async (req, res) => {
  let repoArray = [];
  let repoObj;
  let username = req.params.name;

  //Gets the last 5 repos by creation date
  const repos = await fetch(
    "https://api.bitbucket.org/2.0/repositories/" +
      username +
      "?pagelen=" +
      5 +
      "&sort=-created_on"
  );
  let reposJson = await repos.json();
  repoObj = reposJson;

  // The first loop gets the repo commits details for a repo
  for (let index = 0; index < repoObj.values.length; index++) {
    // Fetches the last 5 commits for the current repo
    let repoCommits = await fetch(
      repoObj.values[index].links.commits.href + "?pagelen=" + 5
    );
    let commits = await repoCommits.json();

    // Object is created and initialized
    var repoInfoObj = new Object();
    repoInfoObj.repoName = repoObj.values[index].name;
    repoInfoObj.createdOn = repoObj.values[index].created_on.substr(0, 10);
    repoInfoObj.commitMsg = [];

    //This loop runs through the previouse fetch results picking out the commit messages
    for (let index2 = 0; index2 < commits.values.length; index2++) {
      repoInfoObj.commitMsg.push(commits.values[index2].rendered.message.raw);
    }
    // The object is the pushed to repoArray
    repoArray.push(repoInfoObj);
  }
  // repoArray displayed
  res.send(repoArray);
});

app.listen(PORT, () => {
  console.log("Listening to port: " + PORT);
});
