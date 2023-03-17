import upload  from "../upload";
import React, { Component } from "react";
import axios from 'axios';

class UploadComponent extends Component{

    constructor(props){
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
        this.uploadImageLocally = this.uploadImageLocally.bind(this);
    }

    uploadImageLocally(file){
        upload(null, file, (err)=>{
            if (err){
                console.log(err)
            }else{
                console.log("success");
            }
        });        
    }

    uploadImage(event){
        event.preventDefault();
        console.log(event.target.file)
        let formData = new FormData();

        let image = document.querySelector("#file").files[0]; // formData.get(event.target.file);

        this.uploadImageLocally(image);

        formData.append("file", image);

        let options = {
            hearders: {
                "Content-Type":"multipart/form-data"
            }
        }
        axios.post(`http://localhost:5000/upload-image/${this.props.id}`, formData, options)
        .then(res =>{
            console.log(res.data)
        }).catch(err => console.log(err));
    }

    render(){
        return (
            <React.Fragment>
                <form enctype="multipart/form-data" onSubmit={this.uploadImage}>
                    <input type="file" id="file" name="file" />
                    <input type="submit"/>
                </form>
            </React.Fragment>
        );
    }
}


export default UploadComponent;