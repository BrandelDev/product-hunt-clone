import React from 'react'
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../context';
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext"
import { useState, useEffect } from 'react';
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage';
import { useForm } from '../hooks/useForm';
import { storage } from '../../firebase/config';
import { v4 } from 'uuid';
const styleCard = {
    with: '18rem'
}

const Product = {
    _id: '',
    name: '',
    description: '',
    url: '',
    userId: '',
    image: '',
    createdAt: '',
    updatedAt: ''
}
const validations = {
    name: [value => value.trim() !== '', 'Name is required'],
    description: [value => value.trim() !== '', 'Description is required'],
    url: [value => value.trim() !== '', 'URL is required'],
};


const initialForm = {
    name: '',
    description: '',
    url: '',
    image: ''
};





const ProductEdit = () => {



    const { editProduct } = useContext(ProductContext)
    const { user } = useContext(AuthContext);

    const [imageProduct, setImageProduct] = useState()

    let { name, description, url, image, onInputChange, isFormValid, resetForm } = useForm(initialForm, validations);

    const location = useLocation();
    console.log(location);
    const data = location.state;
    const imageUrl = data.data.image

    const [imageUpload, setImageUpload] = useState()

    useEffect(() => {
        setImageProduct(imageUrl)
    },[imageUrl])



    const uploadImage = () => {


        if (imageUpload == null) return;
        const imageRef = ref(storage, `products-images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(() => {
                alert('Image of product was uploaded');
                getDownloadURL(imageRef)
                    .then((url) => {
                        setImageProduct(url); // Actualizar imageProduct con la nueva URL
                        console.log(url); // Asegúrate de que la URL se imprima correctamente
                    })
                    .catch((error) => {
                        console.error('Error fetching download URL:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    }



    const handleSubmitReview = () => {
        console.log(user)
        console.log(data.id)
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
       
        const editedProduct = {
            createdAt: data.data.createdAt,
            description: description,
            updatedAt: new Date().toISOString(),
            url: url,
            id: data.id,
            userId: user.uid,
            image: imageProduct
        };

        editProduct(editedProduct);
    };


    return (
        <div>
            <h1>Edit product</h1>
            <div className="container mt-4">
                <div className="row">
                    <div className='col-6'>
                        <div className="card" >
                            <img className="card-img-top" style={styleCard} src={imageProduct} />
                            <div className="card-body">
                                <h5 className="card-title">Upload image of product</h5>
                                <div className='d-flex flex-column'>
                                    <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                    <div className='py-2'>
                                        <button className='btn  btn-primary' onClick={uploadImage}>Upload image</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="card-body">
                            <h5 className=" card-title">Name of product</h5>
                            <input type='text' id='name' name='name' className='form-control' placeholder={data.data.name} value={name} onChange={onInputChange} />
                        </div>
                        <div className='col-6'>
                            <h5 className='py-3 card-title'>Description</h5>
                            <textarea id="description" name="description" className="form-control" placeholder={data.data.description} value={description} onChange={onInputChange} rows={4} />
                        </div>
                        <div className='col-6'>
                            <h5 className='py-3 card-title'>Url of product</h5>
                            <input type='text' id='url' name='url' className='form-control' placeholder={data.data.url} value={url} onChange={onInputChange} />
                        </div>
                        <div className='col-6'>
                            <div className='py-3'>
                                <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>Edit</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-4">
                    <div className='col-lg-2'></div>

                </div>
                {/* <div className="row mt-4">
                <div className='col-2'></div>
                <div className="col-8">
                    <h3>Reseñas de usuarios</h3>
                    {reviews.map(review => (
                        <div className="card mb-2" key={review.id}>
                            <div className="card-body">
                                <h5 className="card-title">{review.user}</h5>
                                <p className="card-text">Calificación: {review.rate}</p>
                                <p className="card-text">Comentario: {review.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            </div>
        </div>
    )
}

export default ProductEdit
