import React from 'react'
import ReactModal from 'react-modal'

import BlogForm from '../blog/blog-form'

ReactModal.setAppElement(".app-wrapper")

const BlogModal = props => {
  const handleSuccessfulFormSubmission = blogRecord => {
    props.handleSuccessfulNewBlogSubmission(blogRecord)
  }
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "800px"
    },
    overlay: {
      backgroundColor: "rgba(1, 1, 1, 0.75)"
    }
  }
  
  return (
    <div className='blog-modal'>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={() => props.handleModalClose()}
        style={customStyles}
        >
        <BlogForm handleSuccessfulFormSubmission={handleSuccessfulFormSubmission} />
      </ReactModal>
    </div>
  )
}

export default BlogModal