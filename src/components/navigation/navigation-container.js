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
            <div>
                <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                <NavLink to="/about" activeClassName="nav-link-active">About</NavLink>
                <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                { this.state.user === 'admin' ? <button>Add Blog</button> : null }
            </div>
        )
    }
}