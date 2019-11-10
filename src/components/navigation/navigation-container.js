import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationComponent extends Component {
    constructor() {
        super();
        this.state = {
            user: 'admin'
        }
    }

    render() {
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
                    <div className="nav-link">
                        <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                    </div>
                    {/* { this.state.user === 'admin' ? <button>Add Blog</button> : null } */}
                </div>
                <div className="nav-right">
                    Parker Stone
                </div>
            </div>
        )
    }
}