
import React, { useState } from 'react';

export const ProductPost = () => {
    const [product, setProduct] = useState({
        title: 'Example product',
        description: 'Description of product',
        publisher: 'El pitalero 1',
        averageRating: 4.5,
        images: ['https://via.placeholder.com/150'],
        purchaseLink: 'https://www.example.com',
        store: 'Tienda de ejemplo',
    });

    const [reviews, setReviews] = useState([
        { id: 1, user: 'User1', rate: 4, content: 'Good quality' },
        { id: 2, user: 'User2', rate: 5, content: 'Exelent quality' },
    ]);

    const [newReview, setNewReview] = useState({ id: 0, user: '', rate: 0, content: '' });

    const handleSubmitReview = () => {
        const userJSON = localStorage.getItem('user');
        const userObj = JSON.parse(userJSON);

        newReview.user  = userObj.userName;
        setReviews([...reviews, newReview]);
        console.log(reviews);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-2">
                    <img src={product.images[0]} className="card-img-top img-fluid " alt="Producto" />
                </div>
                <div className='col-6'>
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text py-3">{product.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Usuario: {product.publisher}</li>
                        <li className="list-group-item">Promedio de calificación: {product.averageRating}</li>
                    </ul>
                    <div className="card-body py-2">
                        <a href={product.purchaseLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Comprar en {product.store}</a>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-lg-2'></div>
                <div className="col-lg-8">

                    <form>
                        <h3>Deja tu reseña</h3>
                        <div className="form-group">
                            <label className='py-3' htmlFor="formRating">Calificación:</label>
                            <select className="form-control" id="formRating" value={newReview.rate} onChange={(e) => setNewReview({ ...newReview, rate: e.target.value })}>
                                <option value="0">Selecciona una calificación</option>
                                <option value="1">1 estrella</option>
                                <option value="2">2 estrellas</option>
                                <option value="3">3 estrellas</option>
                                <option value="4">4 estrellas</option>
                                <option value="5">5 estrellas</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='py-3' htmlFor="formContent">Comentario:</label>
                            <textarea className="form-control py-3" id="formContent" rows="3" value={newReview.content} onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}></textarea>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>Enviar reseña</button>
                    </form>
                </div>
            </div>
            <div className="row mt-4">
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
            </div>
        </div>
    );

}

