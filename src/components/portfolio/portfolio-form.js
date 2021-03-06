// import React, { Component } from 'react';
// import axios from 'axios';
// import {DropzoneComponent as Dropzone} from "react-dropzone-component";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
// import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


// export default class PortfolioForm extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       name: "",
//       description: "",
//       category: "eCommerce",
//       position: "",
//       url: "",
//       thumb_image: "",
//       banner_image: "",
//       logo: "",
//       editMode: false,
//       apiUrl: "https://parkerstone.devcamp.space/portfolio/portfolio_items",
//       apiAction: 'post'
//     }

//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.componentConfig = this.componentConfig.bind(this)
//     this.djsConfig = this.djsConfig.bind(this)
//     this.handleThumbDrop = this.handleThumbDrop.bind(this)
//     this.handleBannerDrop = this.handleBannerDrop.bind(this)
//     this.handleLogoDrop = this.handleLogoDrop.bind(this)
//     this.deleteImage = this.deleteImage.bind(this)

//     this.thumbRef = React.createRef()
//     this.bannerRef = React.createRef()
//     this.logoRef = React.createRef()

//   }

//   componentDidUpdate() {
//     if (Object.keys(this.props.portfolioToEdit).length > 0) {
//       const {id, name, description, category, position, url, thumb_image_url, banner_image_url, logo_url} = this.props.portfolioToEdit
//       this.props.clearPortfolioToEdit()
//       this.setState({
//         id: id,
//         name: name || "",
//         description: description || "",
//         category: category || "eCommerce",
//         position: position || "",
//         url: url || "",
//         editMode: true,
//         apiUrl: `https://parkerstone.devcamp.space/portfolio/portfolio_items/${id}`,
//         apiAction: "patch",
//         thumb_image_url: thumb_image_url || "",
//         banner_image_url: banner_image_url || "",
//         logo_url: logo_url || ""
//       })
//     }
//   }

//   handleThumbDrop() {
//     return {
//       addedfile: file => this.setState({thumb_image: file})
//     }
//   }

//   handleBannerDrop() {
//     return {
//       addedfile: file => this.setState({banner_image: file})
//     }
//   }

//   handleLogoDrop() {
//     return {
//       addedfile: file => this.setState({logo: file})
//     }
//   }


//   componentConfig() {
//     return {
//       iconFiletypes: [".jpg", ".png"],
//       showFiletypeIcon: true,
//       postUrl: "https://httpbin.org/post"
//     }
//   }

//   djsConfig() {
//     return {
//       addRemoveLinks: true,
//       maxFiles: 1
//     }
//   }

//   deleteImage(imageType) {
//     axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`, {withCredentials: true})
//       .then(res => {
//         this.setState({
//           [`${imageType}_url`]: ""
//         })
//       }).catch(err => {
//         console.log("deleteImage error", err)
//       })
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   buildForm() {
//     let formData = new FormData()

//     formData.append("portfolio_item[name]", this.state.name)
//     formData.append("portfolio_item[description]", this.state.description)
//     formData.append("portfolio_item[category]", this.state.category)
//     formData.append("portfolio_item[position]", this.state.position)
//     formData.append("portfolio_item[url]", this.state.url)
//     if (this.state.thumb_image) {
//       formData.append("portfolio_item[thumb_image]", this.state.thumb_image)
//     }
//     if (this.state.banner_image) {
//       formData.append("portfolio_item[banner_image]", this.state.banner_image)
//     }
//     if (this.state.logo) {
//       formData.append("portfolio_item[logo]", this.state.logo)
//     }

//     return formData
//   }

//   handleSubmit(event) {
//     // axios.post("https://parkerstone.devcamp.space/portfolio/portfolio_items",
//     //   this.buildForm(),
//     //   {withCredentials: true}
//     // )
//     axios({
//       method: this.state.apiAction,
//       url: this.state.apiUrl,
//       data: this.buildForm(),
//       withCredentials: true
//     })
//     .then(response => {
//       this.props.handleSuccessfulFormSubmission(response.data.portfolio_item)

//       this.setState({
//         name: "",
//         description: "",
//         category: "eCommerce",
//         position: "",
//         url: "",
//         thumb_image: "",
//         banner_image: "",
//         logo: "",
//         editMode: false,

//       });

//       [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
//         ref.current.dropzone.removeAllFiles()
//       })
//     }) .catch(err => {
//       this.props.handleFormSubmissionError(err)
//       console.log("portfolio form handleSubmit error", err)
//     })

//     event.preventDefault()
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
//         <div className="two-column">
//           <input 
//             type="text"
//             name="name"
//             placeholder="Portfolio Item Name"
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//           <input 
//             type="text"
//             name="url"
//             placeholder="URL"
//             value={this.state.url}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className="two-column">
//           <input 
//             type="text"
//             name="position"
//             placeholder="Position"
//             value={this.state.position}
//             onChange={this.handleChange}
//           />
//           <select 
//             name="category"
//             value={this.state.category}
//             onChange={this.handleChange}
//             className="select-element"
//           >
//             <option value="eCommerce">eCommerce</option>
//             <option value="Scheduling">Scheduling</option>
//             <option value="Enterprise">Enterprise</option>
//           </select>
//         </div>
//         <div className="one-column">
//           <textarea
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={this.state.description}
//             onChange={this.handleChange}
//           />
//         </div>

//         <div className="image-uploaders three-column">
//           {this.state.thumb_image_url && this.state.editMode ? (
//             <div className="portfolio-manager-image-wrapper">
//               <img src={this.state.thumb_image_url}/>
//               <div className="image-removal-link">
//                 <a onClick={() => this.deleteImage("thumb_image")}>Remove file <FontAwesomeIcon icon="trash-alt" /></a>
//               </div>
//             </div>
//             ) : (
//             <Dropzone
//               ref={this.thumbRef}
//               config={this.componentConfig()}
//               djsConfig={this.djsConfig()}
//               eventHandlers={this.handleThumbDrop()}
//               >
//                 <div className="dz-message">Thumbnail</div>
//             </Dropzone>
//           )}

//           {this.state.banner_image_url && this.state.editMode ? (
//             <div className="portfolio-manager-image-wrapper">
//               <img src={this.state.banner_image_url}/>
//               <div className="image-removal-link">
//                 <a onClick={() => this.deleteImage("banner_image")}>Remove file <FontAwesomeIcon icon="trash-alt" /></a>
//               </div>
//             </div>
//             ) : (
//             <Dropzone
//               ref={this.bannerRef}
//               config={this.componentConfig()}
//               djsConfig={this.djsConfig()}
//               eventHandlers={this.handleBannerDrop()}
//               >
//               <div className="dz-message">Banner</div>
//             </Dropzone>
//           )}

//           {this.state.logo_url && this.state.editMode ? (
//             <div className="portfolio-manager-image-wrapper">
//               <img src={this.state.logo_url}/>
//               <div className="image-removal-link">
//                 <a onClick={() => this.deleteImage("logo")}>Remove file <FontAwesomeIcon icon="trash-alt" /></a>
//               </div>
//             </div>
//             ) : (
//             <Dropzone
//               ref={this.logoRef}
//               config={this.componentConfig()}
//               djsConfig={this.djsConfig()}
//               eventHandlers={this.handleLogoDrop()}
//               >
//               <div className="dz-message">Logo</div>
//             </Dropzone>
//           )}
//         </div>

//         <div>
//           <button className="btn" type="submit">{this.state.editMode ? "Update" : "Submit"}</button>
//         </div>
//       </form>
//     );
//   }
// }


import React, { Component } from 'react';
import axios from 'axios';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import DropzoneImage from '../forms/dropzone-image';


export default class PortfolioForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo_image: "",
      editMode: false,
      apiUrl: "https://parkerstone.devcamp.space/portfolio/portfolio_items",
      apiAction: 'post'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.urlStateUpdate = this.urlStateUpdate.bind(this)
    this.imgStateUpdate = this.imgStateUpdate.bind(this)

    this.thumbRef = React.createRef()
    this.bannerRef = React.createRef()
    this.logoRef = React.createRef()

  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {id, name, description, category, position, url, thumb_image_url, banner_image_url, logo_url} = this.props.portfolioToEdit
      this.props.clearPortfolioToEdit()
      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "eCommerce",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://parkerstone.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_image_url: logo_url || ""
      })
    }
  }


  urlStateUpdate(imageType) {
    this.setState({
      [`${imageType}_image_url`]: ""
    })
  }

  imgStateUpdate(file, imageType) {
    this.setState({[`${imageType}_image`]: file})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  buildForm() {
    let formData = new FormData()

    formData.append("portfolio_item[name]", this.state.name)
    formData.append("portfolio_item[description]", this.state.description)
    formData.append("portfolio_item[category]", this.state.category)
    formData.append("portfolio_item[position]", this.state.position)
    formData.append("portfolio_item[url]", this.state.url)
    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image)
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image)
    }
    if (this.state.logo_image) {
      formData.append("portfolio_item[logo]", this.state.logo_image)
    }

    return formData
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true
    })
    .then(response => {
      this.props.handleSuccessfulFormSubmission(response.data.portfolio_item)

      this.setState({
        name: "",
        description: "",
        category: "eCommerce",
        position: "",
        url: "",
        thumb_image: "",
        banner_image: "",
        logo_image: "",
        editMode: false,

      });

      [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
        ref.current.dropzone.removeAllFiles()
      })
    }) .catch(err => {
      this.props.handleFormSubmissionError(err)
      console.log("portfolio form handleSubmit error", err)
    })

    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input 
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input 
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>
        <div className="two-column">
          <input 
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />
          <select 
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="one-column">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders three-column">
          <DropzoneImage
            imgStateUpdate={this.imgStateUpdate}
            urlStateUpdate={this.urlStateUpdate}
            component={"portfolio"}
            id={this.state.id}
            imageType={"thumb"}
            imageUrl={this.state.thumb_image_url}
            editMode={this.state.editMode}
            ref={this.thumbRef}
            message={"Thumbnail"}
          />

          <DropzoneImage
            imgStateUpdate={this.imgStateUpdate}
            urlStateUpdate={this.urlStateUpdate}
            component={"portfolio"}
            id={this.state.id}
            imageType={"banner"}
            imageUrl={this.state.banner_image_url}
            editMode={this.state.editMode}
            ref={this.bannerRef}
            message={"Banner"}
          />

          <DropzoneImage
            imgStateUpdate={this.imgStateUpdate}
            urlStateUpdate={this.urlStateUpdate}
            component={"portfolio"}
            id={this.state.id}
            imageType={"logo"}
            imageUrl={this.state.logo_image_url}
            editMode={this.state.editMode}
            ref={this.logoRef}
            message={"logo"}
          />
        </div>

        <div>
          <button className="btn" type="submit">{this.state.editMode ? "Update" : "Submit"}</button>
        </div>
      </form>
    );
  }
}