import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

const RichTextEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = newState => {
    setEditorState(newState)
  }

  useEffect(() => {
    props.handleRichTextEditorChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
  }, [editorState])

  useEffect(() => {
    if (props.editMode && props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(props.contentToEdit)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [])

  const getBase64 = (file, callback) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => callback(reader.result)
    reader.onerror = error => {}
  }

  const uploadFile = file => {
    return new Promise((resolve, reject) => {
      getBase64(file, data => resolve({data:  {link: data}}))
    })
  }

  return (
    <div className=''>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: {inDropdown: true},
          list: {inDropdown: true},
          textAlign: {inDropdown: true},
          link: {inDropdown: true},
          history: {inDropdown: true},
          image: {
            uploadCallback: uploadFile,
            alt: {present: true, mandatory: false},
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
          }
        }}
      />
    </div>
  )
}

export default RichTextEditor