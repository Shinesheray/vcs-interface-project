import React, { Component } from "react";
import Results from "./Results";
import load from "../load.gif";
import "../css/Home.css";
import Profile from "./Profile";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchedName: "",
      accounts: null,
      vcsChosen: null,
      loadingRes: false,
      isLoaded: false,
    };
    //Bindings
    this.getResults = this.getResults.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.setVcs = this.setVcs.bind(this);
  }

  // Sets the Version Controle System choice
  setVcs(val) {
    this.setState({
      vcsChosen: parseInt(val),
    });
  }

  // Returns all states to default and searches the three vcs providers
  eventHandler(e) {
    e.preventDefault();
    this.setState({
      loadingRes: true,
      accounts: null,
      isLoaded: false,
      vcsChosen: null,
    });
    // Searches the vcs providers
    this.getResults();
  }

  // Fetch from proxy, searches the vcs providers using the provided username
  getResults() {
    fetch("/get-user/" + this.state.searchedName)
      .then((res) => res.json())
      .then((response) => {
        // Sets the states, and setting the loading states for the loading indicators
        this.setState({
          accounts: response,
          isLoaded: true,
          loadingRes: false,
        });
      })
      // If there is a error fetching data
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // Conditional rendering
    // If the page has not loaded
    if (this.state.isLoaded === false) {
      return (
        <div className="home">
          {/* Search bar at the top */}
          <div className="search-div">
            <form
              className="search-form"
              onSubmit={(e) => this.eventHandler(e)}
            >
              <input
                onChange={(e) =>
                  this.setState({ searchedName: e.target.value })
                }
                required
                type="text"
                placeholder="Search username..."
                name="search"
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          {/* Shows the loading circle if the server is busy fetching data*/}
          <div>
            {this.state.loadingRes === true ? (
              <img alt="loading-gif" className="loadingGif" src={load}></img>
            ) : null}
          </div>
          {/* Shows the instructions page at this point*/}
          <Profile
            userName={this.state.searchedName}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
        </div>
      );
    } else {
      return (
        <div className="home">
          {/* Search bar at the top */}
          <div className="search-div">
            <form
              className="search-form"
              onSubmit={(e) => this.eventHandler(e)}
            >
              <input
                onChange={(e) =>
                  this.setState({ searchedName: e.target.value })
                }
                required
                type="text"
                placeholder="Search username..."
                name="search"
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          {/* Shows the search results*/}
          <Results
            setVcsFunction={this.setVcs}
            loadingRes={this.state.loadingRes}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
          {/* Shows the users profile (only if the user has clicked on a provider from the results) */}
          <Profile
            userName={this.state.searchedName}
            accounts={this.state.accounts}
            vcsChosen={this.state.vcsChosen}
          />
        </div>
      );
    }
  }
}
