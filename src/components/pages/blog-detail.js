import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'

import BlogFeaturedImage from '../blog/blog-featured-image'
import BlogForm from '../blog/blog-form'

const BlogDetail = props => {
  const [currentId, setCurrentId] = useState(props.match.params.slug)
  const [blogItem, setBlogItem] = useState({})
  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    if (props.loggedInStatus === "LOGGED_IN") {
      setEditMode(true)
    }
  }

  const handleUpdateFormSubmission = blog => {
    setBlogItem(blog)
    setEditMode(false)
  }

  const getBlogItem = () => {
    axios.get(`https://parkerstone.devcamp.space/portfolio/portfolio_blogs/${currentId}`)
      .then(res => {
        setBlogItem(res.data.portfolio_blog)
      })
      .catch(err => {
        console.log("getBlogItem error: ", err)
      })
  }

  useEffect(() => getBlogItem(), [])

  const {title, content, featured_image_url, blog_status} = blogItem

  const contentManager = () => {
    if (editMode) {
      return (
      <BlogForm
        editMode={editMode}
        blogItem={blogItem}
        handleUpdateFormSubmission={handleUpdateFormSubmission}
      />
      )
    } else {
      return (
        <div className="content-container">
          <h1 onClick={handleEditClick}>{title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      )
    }
  }

  return (
    <div className='blog-container'>
      {contentManager()}
    </div>
  )
}

export default BlogDetail