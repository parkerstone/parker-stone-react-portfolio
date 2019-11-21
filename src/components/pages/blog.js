import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal';


export default function(props) {
  const [blogItems, setBlogItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [blogModalIsOpen, setBlogModalIsOpen] = useState(false)

  const getBlogItems = () => {
    setCurrentPage(currentPage + 1)
    axios.get(`https://parkerstone.devcamp.space/portfolio/portfolio_blogs?page=${currentPage}`, {withCredentials: true})
      .then(res => {
        console.log("getting: ", res.data)
        setBlogItems(blogItems.concat(res.data.portfolio_blogs))
        setTotalCount(res.data.meta.total_records)
        setIsLoading(false)
      })
      .catch(err => {
        console.log("getBlogItems error", err)
      })
  }

  const handleNewBlogClick = () => {
    setBlogModalIsOpen(true)
  }

  const handleModalClose = () => {
    setBlogModalIsOpen(false)
  }

  const handleSuccessfulNewBlogSubmission = blog => {
    handleModalClose()
    setBlogItems(previousData => [blog].concat(previousData))
  }

  // const activateInfiniteScroll = () => {
  //   window.onscroll = () => {
  //     if (isLoading || blogItems.length === totalCount) {
  //       return
  //     }

  //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //       getBlogItems()
  //     }
  //   }
  // }


  useEffect(() => getBlogItems(), [])
  // useEffect(() => activateInfiniteScroll())
  useEffect(() => {
    const onScroll = () => {
      if (isLoading || blogItems.length === totalCount) {
        return
      }
  
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        getBlogItems()
      }
    }

    window.addEventListener("scroll", onScroll, false)

    return function cleanup() {
      window.removeEventListener("scroll", onScroll, false)
    }
  })

  const blogRecords = blogItems.map(item => <BlogItem key={item.id} blogItem={item} />)

  return (
    <div className='blog-container'>
      <BlogModal
        modalIsOpen={blogModalIsOpen}
        handleModalClose={handleModalClose}
        handleSuccessfulNewBlogSubmission={handleSuccessfulNewBlogSubmission}
      />

      {props.loggedInStatus === "LOGGED_IN" ? (
        <div className="new-blog-link">
          <a onClick={handleNewBlogClick}><FontAwesomeIcon icon="plus-circle" /></a>
        </div>
      ) : null}

      <div className="content-container">{blogRecords}</div>
      {isLoading ? <div className="content-loader"><FontAwesomeIcon icon="spinner" spin /></div> : null}
    </div>
  )
}