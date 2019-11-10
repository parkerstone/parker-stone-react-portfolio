import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
    constructor (props) {
        super(props);

        this.state = {
            portfolioItemClass: ""
        }
    }

    handleMouseEnter() {
        this.setState({portfolioItemClass: "image-blur"})
    }

    handleMouseLeave() {
        this.setState({portfolioItemClass: ""})
    }

    render() {
        const { id, name, description, thumb_image_url, logo_url } = this.props.item;
        return (
            <div className="portfolio-item-wrapper"
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <div
                    className={"portfolio-img-background " + this.state.portfolioItemClass}
                    style={{
                        backgroundImage: `url(${thumb_image_url})`
                    }}
                />
    
                <div className="img-text-wrapper">
                    <div className="logo-wrapper">
                        <img src={logo_url} />
                    </div>
    
                    <div className="subtitle">
                        {description}
                    </div>
                </div>
    
                {/* <img src={logo_url} />
                <h3>{name}</h3>
                <div>{description}</div>
                <Link to={`/portfolio/${id}`}>{name}</Link> */}
            </div>
        )
    }
}