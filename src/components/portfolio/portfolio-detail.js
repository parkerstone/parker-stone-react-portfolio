import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function(props) {
  const id = props.match.params.slug
  const [portfolioItem, setPortfolioItem] = useState({})

  useEffect(() => {
    axios.get(`https://parkerstone.devcamp.space/portfolio/portfolio_items/${id}`)
    .then(res => {
      setPortfolioItem(res.data.portfolio_item)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const {banner_image_url, category, description, logo_url, name, thumb_image_url, url} = portfolioItem

  const bannerStyles = {
    backgroundImage: `url(${banner_image_url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "300px",
    width: "80vw"
  }

  return (
    <div className='portfolio-detail'>
      <h1>{name}</h1>
      <a href={url} target="_blank">{name} Homepage</a>
      <div
        className="banner"
        alt="Banner image"
        style={bannerStyles}
      >
        <img src={logo_url} alt="logo" />
      </div>
      <p>{description}</p>
    </div>
  )
}