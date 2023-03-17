import React from 'react';
import './styles/productForm.css';
import PropTypes from 'prop-types'; 
import UploadComponent from "./UploadComponent";
import axios from 'axios';

import {v4} from 'uuid'; //new code

function NewProductForm(props) {

    // function to upload image to backend
    // You can move this into product control
    function uploadImage(event, productId){
        event.preventDefault();
        console.log(event.target.file)
        let formData = new FormData();
        let image = document.querySelector("#formFile").files[0]; // updated to reflect if of input for image

        formData.append("file", image);

        let options = {
            hearders: {
                "Content-Type":"multipart/form-data"
            }
        }
        axios.post(`http://localhost:5000/upload-image/${productId}`, formData, options)
        .then(res =>{
            console.log(res.data)
        }).catch(err => console.log(err));
    }
    
    // Function for handling onsubmission event
    function handleNewProductFormSubmission(event){
        event.preventDefault();
        // console.log(event.target.name.value)
        // console.log(event.target.price.value)
        // console.log(event.target.description.value)
        // console.log(event.target.quantity.value);

        let newProductId = v4();  // move the product id here

        props.onNewProductCreation({
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            quantity: event.target.quantity.value,
            image: event.target.file,
            id: newProductId
        })

        // call function to upload image when form is submitted
        // this might fail because the product creation might take time yet this function filters by existing product
        // solution will be to remove the filter from the upload endpoint, and just upload the file
        // or make it work in async (upload the image after the product has been created in db)
        uploadImage(event, newProductId);

       

    }

    return (
        <React.Fragment>

            <div className="container product-form">

                <form className="new-product-form" method="POST" enctype="multipart/form-data" onSubmit={handleNewProductFormSubmission}>

                    <h1>Product Form</h1>
                    <div className="form-input-material">
                        <input type = 'text'
                            name = 'name'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'name'
                        />
                        <label htmlFor="name"> Name</label>
                    </div>
                    <div className="form-input-material">
                        <input type = 'text'
                            name = 'price'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'price'
                            required
                        />
                        <label htmlFor="price"> Price</label>
                    </div>
                    <div className="form-input-material">
                        <textarea type = 'text'
                            name = 'description'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'description'
                            required
                        />
                        <label htmlFor="description"> Description </label>
                    </div>
                    <div className="form-input-material">
                        <input type = 'number'
                            name = 'quantity'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'quantity'
                            required
                        />
                        <label htmlFor="quantity"> Quantity</label>
                    </div>
                    <div class="file-field input-field">
                        <label htmlFor="image">Upload Product Image</label>
                        <input type = 'file'
                                name = 'image'
                                placeholder = ' '
                                className = 'form-control-material'
                                id = 'formFile'
                                required
                            />
                    </div>
                    <button type="submit" className="btn btn-primary btn-ghost">Add Product</button>    
                </form>

                {/* < UploadComponent id='' /> */} 
            </div>
        </React.Fragment>
    )
}

NewProductForm.propTypes = {
    onNewProductCreation: PropTypes.func
}

export default NewProductForm;