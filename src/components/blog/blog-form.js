import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RichTextEditor from '../forms/rich-text-editor'
import DropzoneImage from '../forms/dropzone-image'

const BlogForm = props => {
  const [formInfo, setFormInfo] = useState({
    id: "",
    title: "",
    blog_status: "",
    content: "",
    featured_image: "",
    apiUrl: "https://parkerstone.devcamp.space/portfolio/portfolio_blogs",
    apiAction: "post"
  })

  useEffect(() => {
    if (props.editMode) {
      const {id, title, blog_status, featured_image_url, content} = props.blogItem
      setFormInfo(data => ({
        ...data,
        id,
        title,
        blog_status,
        featured_image_url,
        content,
        apiUrl: `https://parkerstone.devcamp.space/portfolio/portfolio_blogs/${id}`,
        apiAction: "patch"
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

  const imgStateUpdate = (file) => {
    setFormInfo(data => ({
      ...data,
      featured_image: file
    }))
  }

  const urlStateUpdate = () => {
    setFormInfo(data => ({
      ...data,
      featured_image_url: ""
    }))
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
    // axios.post(formInfo.apiUrl, buildForm(), {withCredentials: true})
    axios({
      method: formInfo.apiAction,
      url: formInfo.apiUrl,
      data: buildForm(),
      withCredentials: true
    })
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

        if (props.editMode) {
          props.handleUpdateFormSubmission(res.data.portfolio_blog)
        } else {
          props.handleSuccessfulFormSubmission(res.data.portfolio_blog)
        }
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
        <select
          onChange={handleChange}
          name="blog_status"
          value={formInfo.blog_status}
          className='select-element'
        >
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
        </select>
      </div>

      <div className="one-column">
        <RichTextEditor
          handleRichTextEditorChange={handleRTEChange}
          editMode={props.editMode}
          contentToEdit={props.editMode && props.blogItem.content ? props.blogItem.content : null}
        />
      </div>

      <div className='image-uploaders'>
        <DropzoneImage
            imgStateUpdate={imgStateUpdate}
            urlStateUpdate={urlStateUpdate}
            component={"blog"}
            id={formInfo.id}
            imageType={"featured"}
            imageUrl={formInfo.featured_image_url}
            editMode={props.editMode}
            ref={featuredImageRef}
            message={"Featured Image"}
          />
        {/* <Dropzone
          ref={featuredImageRef}
          config={componentConfig()}
          djsConfig={djsConfig()}
          eventHandlers={handleFeaturedImageDrop()}
        >
          <div className="dz-message">Featured Image</div>
        </Dropzone> */}
      </div>

      <button className="btn">Save</button>
    </form>
  )
}

export default BlogForm