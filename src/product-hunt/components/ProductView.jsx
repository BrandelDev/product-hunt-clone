import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth/context/AuthContext';
import Modal from 'react-modal';
import { Link, NavLink, useNavigate } from "react-router-dom";

const ProductView = ({ product, isOpen, onClose }) => {
    const { addComment, getProductComments, productsComment, followUser, resetProductComments } = useContext(ProductContext);
    const { user, logged } = useContext(AuthContext);
    const [newReview, setNewReview] = useState({ content: '', rate: 0 });
    const [averageRating, setAverageRating] = useState(0)


    useEffect(() => {
        const fetchProductsComments = async () => {
            if (isOpen && product) {
                resetProductComments();
                await getProductComments(product.id);
                calculateAvergareRating()
            }
        }
        fetchProductsComments();
    }, [product.id]);

    useEffect(() => { 
        calculateAvergareRating()
    },[productsComment])

    console.log(productsComment)

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

    const handleFollowUser = async (userId, displayName) => {
        if (user) {
            await followUser(userId,displayName )
        } else {
            alert('You need to be logged in to add a comment.');
        }
    };

    if (!isOpen) {
        return null;
    }

    const calculateAvergareRating = () => {

        let totalRate = 0;
        let totalObjects = 0;
        for (const key in productsComment) {
            const innerObj = productsComment[key];
            for (const innerKey in innerObj) {
                totalRate += parseInt(innerObj[innerKey].rate);
                totalObjects++;
            }
        }
        const averageRating = totalObjects > 0 ? (totalRate / totalObjects) : 0;

        setAverageRating(Math.round((averageRating) * 100) / 100);
    }



    const handleClose = () => {

        onClose();
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Detalles del Producto"
        >
            {product && (
                <div>
                    <div className='row'>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-6'>
                            <img width='150px' src={product.data.image} alt={product.data.name} />
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <h3>{product.data.name}</h3>
                                    <p>{product.data.description}</p>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='d-flex'>
                                        <div>
                                            <button className='btn btn-success mx-3'>Visit</button>
                                        </div>
                                        <div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5>Average rating:</h5>
                                                    <h5 className='text-center'>{averageRating}/5</h5>
                                                </div>
                                            </div>
                                        </div>
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

                                            <h5 className='py-1'>Submit a review</h5>
                                            <textarea
                                                className='form-control py-2'
                                                name="content"
                                                value={newReview.content}
                                                onChange={handleReviewChange}
                                            ></textarea>
                                        </div>
                                        <div className='py-3'>
                                            <button className='btn btn-primary my-2' onClick={handleAddComment}>Submit comment</button>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            <div className='col-lg-12 py-1'>Comments by other users</div>
                                            {productsComment[product.id] && Object.keys(productsComment[product.id]).map(commentId => (
                                                <div key={commentId} className="card mb-3 d-flex">
                                                    <div className='d-flex py-2 justify-content-between'>
                                                        <img width='40px' src={productsComment[product.id][commentId].userPhotoUrl} />
                                                        <h5 className="card-title">{productsComment[product.id][commentId].userDisplayName}</h5>
                                                        <button width='' onClick={() => handleFollowUser(productsComment[product.id][commentId].userId, productsComment[product.id][commentId].userDisplayName )} className='btn btn-warning'>Follow</button>
                                                    </div>
                                                    <div className="card-body">

                                                        <h6 className="card-subtitle mb-2 text-muted">Rate: {productsComment[product.id][commentId].rate}</h6>
                                                        <p className="card-text">{productsComment[product.id][commentId].content}</p>
                                                        <p className="card-text"><small className="text-muted">Created at: {productsComment[product.id][commentId].createdAt?.toDate ? new Date(productsComment[product.id][commentId].createdAt.seconds * 1000).toLocaleString() : 'Unknown'}</small></p>
                                                        <p className="card-text"><small className="text-muted">Updated at: {productsComment[product.id][commentId].updatedAt?.toDate ? new Date(productsComment[product.id][commentId].updatedAt.seconds * 1000).toLocaleString() : 'Unknown'}</small></p>
                                                    </div>
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
                            <button className='btn btn-warning' onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductView;