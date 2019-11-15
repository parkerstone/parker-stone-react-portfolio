import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faSignOutAlt, faEdit} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

library.add(faTrash, faSignOutAlt, faEdit)

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      portfolioApiData: []
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", { withCredentials: true })
      .then(response => {
        const loggedIn = response.data.logged_in
        const loggedInStatus = this.state.loggedInStatus

        // if loggedIn and status in LOGGED_IN => nothing
        // if loggedIn status NOT_LOGGED_IN => update state
        // if !loggedIn and status LOGGED_IN => update state 
        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          })
        } else if (!loggedIn & loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          })
        }
      })
      .catch(error => {
        console.log("Error", error)
      })
  }

  getPortfolioItems() {
    axios.get('https://parkerstone.devcamp.space/portfolio/portfolio_items') //to reverse order: '?order_by=created_at&direction=desc'
    .then(res => {
      this.setState({
        portfolioApiData: res.data.portfolio_items
      })
    })
    .catch(err => {
      console.log("There was an error getting the portfolio items from the API. ", err);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.getPortfolioItems();
  }

  authorizedPages() {
    return [
      <Route 
        key="portfolio-manager"
        path="/portfolio-manager"
        render={props => 
          <PortfolioManager
            {...props}
            portfolioApiData={this.state.portfolioApiData}
            getPortfolioItems={this.getPortfolioItems.bind(this)}
          />
        }
      />
    ]
  }

  render() {
    return (
      <div className='container'>

        <Router>
          <div>
            <NavigationContainer
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" render={props => <Home {...props} portfolioApiData={this.state.portfolioApiData} />} />
              <Route
                path="/auth"
                render={props => (
                  <Auth 
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}
