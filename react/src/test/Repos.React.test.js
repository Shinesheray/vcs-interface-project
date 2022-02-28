import React from "react";
import renderer from "react-test-renderer";
import Repos from "../Repos";

// Empty set of results
const reposEmptyExample = [];
// Full set of results
const reposFullExample = [
  {
    repoName: "repo1",
    repoDesc: "repo1Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
  {
    repoName: "repo2",
    repoDesc: "repo2Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
  {
    repoName: "repo3",
    repoDesc: "repo3Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
  {
    repoName: "repo4",
    repoDesc: "repo4Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
  {
    repoName: "repo5",
    repoDesc: "repo5Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
];
// Partial set of results ( this is mainly for bitbucket )
const reposPartialExample = [
  {
    repoName: "repo1",
    repoDesc: "repo1Desc",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg2", "msg3", "msg4", "msg5"],
  },
  {
    repoName: "repo2",
    createdOn: "dd-mm-yy",
    commitMsg: ["msg1", "msg4", "msg5"],
  },
  { repoName: "repo3", repoDesc: "", createdOn: "dd-mm-yy", commitMsg: [] },
];

// Test case for a full repo with all details
test("Renders full repos correctly", () => {
  const tree = renderer.create(<Repos repos={reposFullExample} />).toJSON();

  expect(tree).toMatchSnapshot();
});

// Test case for a partial repo with some details
test("Renders partial repos correctly", () => {
  const tree = renderer.create(<Repos repos={reposPartialExample} />).toJSON();

  expect(tree).toMatchSnapshot();
});

// Test case for a empty repo
test("Renders empty repos correctly", () => {
  const tree = renderer.create(<Repos repos={reposEmptyExample} />).toJSON();

  expect(tree).toMatchSnapshot();
});
