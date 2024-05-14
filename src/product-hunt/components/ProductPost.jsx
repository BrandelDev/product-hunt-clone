
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext"
import { ProductContext } from '../context/ProductContext';
import { useForm } from '../hooks/useForm';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const styleCard = {
    with: '18rem'
}

const newProduct = {
    _id: '',
    name: '',
    description: '',
    url: '',
    userId: '',
    image: '',
    createdAt: '',
    updatedAt: ''
}



export const ProductPost = () => {

    const { saveProduct } = useContext(ProductContext)
    const { user } = useContext(AuthContext);

    const [imageProduct, setImageProduct] = useState()

    const { name, description, url, image, onInputChange } = useForm(newProduct)

    const [imageUpload, setImageUpload] = useState()


    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `products-images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Image of product was upload')
            getDownloadURL(imageRef).then((url) => {
                setImageProduct(url)
            })
                .catch((error) => {
                    console.error('Error fetching download URL:', error);
                });
        })
    }



    const handleSubmitReview = () => {
        console.log(user)
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const product = {
            _id: '',
            name: name,
            description: description,
            url: url,
            userId: user.uid,
            image: imageProduct,
            createdAt: datetime,
            updateAt: ''
        }
        saveProduct(product);
    };

    return (
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
                        <input type='text' id='name' name='name' className='form-control' value={name} onChange={onInputChange} />
                    </div>
                    <div className='col-6'>
                        <h5 className='py-3 card-title'>Description</h5>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={onInputChange}
                            rows={4}
                        />
                    </div>
                    <div className='col-6'>
                        <h5 className='py-3 card-title'>Url of product</h5>
                        <input type='text' id='url' name='url' className='form-control' value={url} onChange={onInputChange} />
                    </div>
                    <div className='col-6'>
                        <div className='py-3'>
                            <button type="button" className="btn  btn-primary" onClick={handleSubmitReview}>Send your review</button>
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
    );

}

