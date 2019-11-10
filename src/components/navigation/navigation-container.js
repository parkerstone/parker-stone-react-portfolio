import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";

const NavigationComponent = (props) => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link">
                <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios.delete("http://api.devcamp.space/logout", {withCredentials: true})
            .then(response => {
                if(response.status === 200) {
                    props.history.push("/")
                    props.handleSuccessfulLogout()
                }
                return response.data
            }).catch(error => {
                console.log("Error signing out: ", error)
            })
    }
    
    return (
        <div className="nav-wrapper">
            <div className="nav-left">
                <div className="nav-link">
                    <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                </div>
                <div className="nav-link">
                    <NavLink to="/about" activeClassName="nav-link-active">About</NavLink>
                </div>
                <div className="nav-link">
                    <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                </div>
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog", "Blog") : null}
            </div>
            <div className="nav-right">
                Parker Stone
                {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}>Sign Out</a> : null }
            </div>
        </div>
    )
}

export default withRouter(NavigationComponent)