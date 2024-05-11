
import React, { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext"
import { ProductContext } from '../context/ProductContext';
import { useForm } from '../hooks/useForm';

const newProduct = {
    title: '',
    description: '',
    url: '',
    userId: '',
    content: '',
    createdAt: '',
    updateAt: ''
}

export const ProductPost = () => {

    const { saveProduct} = useContext(ProductContext)
    const { user } = useContext(AuthContext);

    const { title, description, url, content, images, onInputChange } = useForm(newProduct)

    const [product, setProduct] = useState({
        title: 'Example product',
        description: 'Description of product',
        publisher: user?.displayName,
        averageRating: 4.5,
        images: ['https://via.placeholder.com/150'],
        purchaseLink: 'https://www.example.com',
    });

    // const [reviews, setReviews] = useState([
    //     { id: 1, user: 'User1', rate: 4, content: 'Good quality' },
    //     { id: 2, user: 'User2', rate: 5, content: 'Exelent quality' },
    // ]);

    const [newReview, setNewReview] = useState({ id: 0, user: '', rate: 0, content: '' });

    const handleSubmitReview = () => {
        // const userJSON = localStorage.getItem('user');
        // const userObj = JSON.parse(userJSON);

        // newReview.user = userObj.userName;
        // setReviews([...reviews, newReview]);
        // console.log(reviews);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-2">
                    <img src={product.images[0]} className="card-img-top img-fluid " alt="Producto" />
                </div>
                <div className='col-6'>
                    <div className="card-body">
                        <h5 className="py-3 card-title">Name of product</h5>
                        <input type='text' id='title' name='title' className='form-control' value={description} onChange={onInputChange}/>
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
                        <input type='text' id='url' className='form-control' value={url} onChange={onInputChange}/>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-lg-2'></div>
                <div className="col-lg-8">

                    <form>
                        <h3>Leave your review</h3>
                        <div className="form-group">
                            <label className='py-3' htmlFor="formRating">Score:</label>
                            <select className="form-control" id="formRating" value={newReview.rate} onChange={(e) => setNewReview({ ...newReview, rate: e.target.value })}>
                                <option value="0">Select an ranting</option>
                                <option value="1">1 star</option>
                                <option value="2">2 star</option>
                                <option value="3">3 star</option>
                                <option value="4">4 star</option>
                                <option value="5">5 star</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='py-3' htmlFor="formContent">Comment:</label>
                            <textarea className="form-control py-3" id="formContent" rows="3" value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}></textarea>
                        </div>
                        <div className='py-3'>
                        <button type="button" className="btn  btn-primary" onClick={handleSubmitReview}>Send your review</button>
                        </div>
                    </form>
                </div>
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

