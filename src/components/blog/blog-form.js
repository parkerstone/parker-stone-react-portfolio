import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DropzoneComponent as Dropzone } from 'react-dropzone-component'

import RichTextEditor from '../forms/rich-text-editor'

const BlogForm = props => {
  const [formInfo, setFormInfo] = useState({
    id: "",
    title: "",
    blog_status: "",
    content: "",
    featured_image: ""
  })

  useEffect(() => {
    if (props.editMode) {
      setFormInfo(data => ({
        ...data,
        id: props.blogItem.id,
        title: props.blogItem.title,
        blog_status: props.blogItem.blog_status
      }))
    }
  }, [])

  const handleRTEChange = content => {
    setFormInfo(data => ({
      ...data,
      content
    }))
  }

  const handleChange = event => {
    event.persist()
    setFormInfo(data => ({
      ...data,
      [event.target.name]: event.target.value
    }))
  }

  const componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  const djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  const handleFeaturedImageDrop = () => {
    return {
      addedfile: file => setFormInfo(data => ({
        ...data,
        featured_image: file
      }))
    }
  }

  const buildForm = () => {
    let formData = new FormData()
    formData.append("portfolio_blog[title]", formInfo.title)
    formData.append("portfolio_blog[blog_status]", formInfo.blog_status)
    formData.append("portfolio_blog[content]", formInfo.content)

    if (formInfo.featured_image) {
      formData.append("portfolio_blog[featured_image]", formInfo.featured_image)
    }

    return formData
  }

  let featuredImageRef = React.createRef()

  const handleSubmit = event => {
    axios.post("https://parkerstone.devcamp.space/portfolio/portfolio_blogs", buildForm(), {withCredentials: true})
      .then(res => {
        if (formInfo.featured_image) {
          featuredImageRef.current.dropzone.removeAllFiles()
        }

        setFormInfo({
          id: "",
          title: "",
          blog_status: "",
          content: "",
          featured_image: ""
        })

        props.handleSuccessfulFormSubmission(res.data.portfolio_blog)
      })
      .catch(err => {
        console.log("handleSubmit for blog error: ", err)
      })

    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="blog-form-wrapper">
      <div className="two-column">
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formInfo.title}
        />
        <input
          onChange={handleChange}
          type="text"
          name="blog_status"
          placeholder="Blog Status"
          value={formInfo.blog_status}
        />
      </div>

      <div className="one-column">
        <RichTextEditor
          handleRichTextEditorChange={handleRTEChange}
          editMode={props.editMode}
          contentToEdit={props.editMode && props.blogItem.content ? props.blogItem.content : null}
        />
      </div>

      <div className='image-uploaders'>
        <Dropzone
          ref={featuredImageRef}
          config={componentConfig()}
          djsConfig={djsConfig()}
          eventHandlers={handleFeaturedImageDrop()}
        >
          <div className="dz-message">Featured Image</div>
        </Dropzone>
      </div>

      <button className="btn">Save</button>
    </form>
  )
}

export default BlogForm