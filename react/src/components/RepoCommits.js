import React from "react";

export default function RepoCommits(props) {
  // Deconstruct props
  const { commitMsg } = props;

  // Map messages
  const listItems = commitMsg.map((msg, index) => (
    <li key={index.toString()}>{msg}</li>
  ));

  return <ul>{listItems}</ul>;
}
