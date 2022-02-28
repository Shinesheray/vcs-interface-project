import React, { Component } from "react";
import Repos from "./Repos";
import loading from "../loading.gif";

export default class BitbucketProfile extends Component {
  constructor(props) {
    super(props);
    // States
    this.state = {
      repos: null,
      isLoaded: false,
    };
  }

  // Fetches the repos for onload
  componentDidMount() {
    fetch(
      "/user/bitbucket/repo/" + this.props.accounts[this.props.vcsChosen].uuid
    )
      .then((res) => res.json())
      .then((response) => {
        // States are set, load state is changed
        this.setState({
          repos: response,
          isLoaded: true,
        });
      })
      // If there is a error
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { accounts, vcsChosen } = this.props;
    // Shows the users details while repo is loading
    if (!this.state.isLoaded) {
      return (
        <div>
          {/* User information section */}
          <div className="top-container">
            <div className="row">
              {/* Profile picture section */}
              <div className="pro-pic-div col-6">
                <img
                  alt="profile-avatar"
                  className="profile-picture"
                  src={accounts[vcsChosen].links.avatar.href}
                ></img>
              </div>
              {/* Side info section */}
              <div className="side-info col-6">
                <p>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].nickname}
                </p>
                <p>
                  <i className="fa fa-address-card" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].display_name}
                </p>
                <p>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&emsp;
                  {accounts[vcsChosen].created_on.substr(0, 10)}
                </p>
                <a href={accounts[vcsChosen].links.html.href} target="blank">
                  <button>Go to Bitbucket</button>
                </a>
              </div>
            </div>
          </div>
          {/* Repository section section */}
          <div className="loading-div">
            <h2>loading Recent Repos...</h2>
            <img alt="loading-gif" className="loadingGif" src={loading}></img>
          </div>
        </div>
      );
      // Show repos once loaded
    } else {
      return (
        <div>
          {/* User information section */}
          <div className="top-container">
            <div className="row">
              {/* Profile picture section */}
              <div className="pro-pic-div col-4">
                <img
                  alt="profile-avatar"
                  className="profile-picture"
                  src={accounts[vcsChosen].links.avatar.href}
                ></img>
              </div>
              {/* Side info section */}
              <div className="side-info col-8">
                <p>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].nickname}
                </p>
                <p>
                  <i className="fa fa-address-card" aria-hidden="true"></i>
                  &emsp;{accounts[vcsChosen].display_name}
                </p>
                <p>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&emsp;
                  {accounts[vcsChosen].created_on.substr(0, 10)}
                </p>
                <a href={accounts[vcsChosen].links.html.href} target="blank">
                  <button>Go to Bitbucket</button>
                </a>
              </div>
            </div>
          </div>
          {/* Repository section section */}
          <div>
            <h3>Repositories</h3>
          </div>
          <div>
            <Repos repos={this.state.repos} />
          </div>
        </div>
      );
    }
  }
}
