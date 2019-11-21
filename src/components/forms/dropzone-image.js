import React from 'react'
import axios from 'axios'
import DropzoneComponent from 'react-dropzone-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropzoneImage = React.forwardRef((props, ref) => {
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
      maxFiles: props.maxFiles ? props.maxFiles : 1
    }
  }

  const handleImageDrop = () => {
    return {
      addedfile: file => props.imgStateUpdate(file, props.imageType)
    }
  }

  const deleteImage = () => {
    axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio${props.component === "blog" ? "-blog" : ""}-image/${props.id}?image_type=${props.imageType}${props.imageType === "logo" ? "" : "_image"}`, {withCredentials: true})
      .then(res => {
        props.urlStateUpdate(props.imageType)
      }).catch(err => {
        console.log("deleteImage error", err)
      })
  }

  if (props.imageUrl && props.editMode) {
    return(
      <div className="dropzone-image-wrapper">
        <img src={props.imageUrl}/>
        <div className="image-removal-link">
          <a onClick={() => deleteImage()}>Remove file <FontAwesomeIcon icon="trash-alt" /></a>
        </div>
      </div>
    )
  } else {
    return(
      <DropzoneComponent
        ref={ref}
        config={componentConfig()}
        djsConfig={djsConfig()}
        eventHandlers={handleImageDrop()}
        >
          <div className="dz-message">{props.message}</div>
      </DropzoneComponent>
    )
  }
})

export default DropzoneImage