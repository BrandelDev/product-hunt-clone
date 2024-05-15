import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserView = () => {

    const { getProducts, deleteProduct } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    console.log(products)

    const deleteProductView = async (productId) => {
        await deleteProduct(productId);
        fetchProducts();
    }

    const handleEditClick = (product) => { 
        
        const editProductPath =  `/edit-product/${product.id}`
        navigate(editProductPath, { replace: true })

    }











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
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditClick(products)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteProductView(products)}>Delete</button>
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