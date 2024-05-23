import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth/context/AuthContext';
import Modal from 'react-modal';
import { Link, NavLink, useNavigate } from "react-router-dom";

const ProductView = ({ product, isOpen, onClose }) => {
    const { addComment, getProductComments, productsComment } = useContext(ProductContext);
    const { user, logged } = useContext(AuthContext);
    const [newReview, setNewReview] = useState({ content: '', rate: 0 });
    

    useEffect(() => {
        if (isOpen && product) {
            getProductComments(product.id);
        }
    }, [isOpen, product, getProductComments]);

    const handleReviewChange = (e) => {

        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddComment = async () => {
        if (user) {
            await addComment(product.id, newReview.content, newReview.rate, user);
            setNewReview({ content: '', rate: 0 });
        } else {
            alert('You need to be logged in to add a comment.');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Detalles del Producto"
        >
            {product && (
                <div>
                    <div className='row'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-6'>
                            <img width='100px' src={product.data.image} alt={product.data.name} />
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <h3>{product.data.name}</h3>
                                    <p>{product.data.description}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='d-flex'>
                                        <button className='btn btn-success mx-3'>Visit</button>
                                        <button className='btn btn-warning'>UPVOTE</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='row py-2'>
                                <div className='col-lg-6'>
                                    <label>What do you think?</label>
                                </div>
                                {!logged ? (
                                    <div className='col-lg-6 align-items-center d-flex'>
                                        <li className='ms-3 sign-in-button'>
                                            <NavLink className="decoration-link" to='/welcome'>Login to comment</NavLink>
                                        </li>
                                    </div>
                                ) : (
                                    <div className='row py-1'>
                                        <div className='col-lg-12'>
                                            <label className='py-2'>Review</label>
                                            <select
                                                className='form-control'
                                                name="rate"
                                                value={newReview.rate}
                                                onChange={handleReviewChange}
                                            >
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <h3 className='py-1'>Submit a review</h3>
                                        <textarea
                                            className='form-control py-2'
                                            name="content"
                                            value={newReview.content}
                                            onChange={handleReviewChange}
                                        ></textarea>
                                        <button className='btn btn-primary my-2' onClick={handleAddComment}>Submit comment</button>
                                        <hr />
                                        <div className='row'>
                                            <div className='col-lg-12'>Comments by other users</div>
                                            {productsComment[product.id] && Object.keys(productsComment[product.id]).map(commentId => (
                                                <div key={commentId}>
                                                    <strong>{productsComment[product.id][commentId].userDisplayName}:</strong>
                                                    <p>{productsComment[product.id][commentId].content}</p>
                                                    <p>Rate: {productsComment[product.id][commentId].rate}</p>
                                                    <p>Created at: {productsComment[product.id][commentId].createdAt?.toDate() ? new Date(productsComment[product.id][commentId].createdAt.seconds * 1000).toString() : 'Unknown'}</p>
                                                    <p>Updated at: {productsComment[product.id][commentId].updatedAt?.toDate() ? new Date(productsComment[product.id][commentId].updatedAt.seconds * 1000).toString() : 'Unknown'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-12 d-flex justify-content-end'>
                            <button className='btn btn-warning' onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductView;