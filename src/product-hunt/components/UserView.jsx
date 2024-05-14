import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const UserView = () => {

    const { getProducts } = useContext(ProductContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const fetchedProducts = await getProducts();
          setProducts(fetchedProducts);
          
        };
    
        fetchProducts();
      }, []);

      console.log(products)












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
                        {products.map((products) => (
                            <li key={products.id} className="list-group-item">
                                <h4>{products.data.name}</h4>
                                <p>{products.data.description}</p>
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => editReview(review.id)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteReview(review.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <span>Do want create a new product?</span><br />
                            <Link to="/user-logged/post-product">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserView;