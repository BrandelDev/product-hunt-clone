import React, { useState } from 'react';
import { ProductPost } from './ProductPost';
import { Link } from 'react-router-dom';

const UserView = () => {
    const [reviews, setReviews] = useState([
        { id: 1, title: 'Great Product', content: 'This product is amazing!', author: 'John Doe' },
        { id: 2, title: 'Excellent Service', content: 'The customer service is top-notch.', author: 'Jane Smith' },
    ]);
    const [formData, setFormData] = useState({ title: '', content: '', author: '' });
    const [editingId, setEditingId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addReview = () => {
        if (formData.title && formData.content && formData.author) {
            const newReview = { ...formData, id: Date.now() };
            setReviews([...reviews, newReview]);
            setFormData({ title: '', content: '', author: '' });
        } else {
            alert('Please fill out all fields.');
        }
    };

    const editReview = (id) => {
        const reviewToEdit = reviews.find((review) => review.id === id);
        if (reviewToEdit) {
            setFormData({ ...reviewToEdit });
            setEditingId(id);
        }
    };

    const updateReview = () => {
        if (formData.title && formData.content && formData.author) {
            const updatedReviews = reviews.map((review) =>
                review.id === editingId ? { ...review, ...formData } : review
            );
            setReviews(updatedReviews);
            setFormData({ title: '', content: '', author: '' });
            setEditingId(null);
        } else {
            alert('Please fill out all fields.');
        }
    };

    const deleteReview = (id) => {
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Product Reviews</h2>
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group">
                        {reviews.map((review) => (
                            <li key={review.id} className="list-group-item">
                                <h4>{review.title}</h4>
                                <p>{review.content}</p>
                                <p>By: {review.author}</p>
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => editReview(review.id)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteReview(review.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <span>Do want create a new product?</span><br/>
                            <Link to="/user-logged/post-product">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserView;