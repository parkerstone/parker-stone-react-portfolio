import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import Truncate from 'react-truncate'

const BlogItem = props => {
  const {
    id,
    blog_status,
    content,
    title,
    featured_image_url
  } = props.blogItem

  return (
    <div className="blog-item">
      <Link to={`/blog/${id}`}><h1>{title}</h1></Link>
      <div>
        <Truncate
          lines={5}
          ellipsis={
            <span>
              ...<Link to={`/blog/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>  
      </div>
    </div>
  )
}

export default BlogItem