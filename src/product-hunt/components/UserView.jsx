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


    const deleteProductView = async (productId) => {
        await deleteProduct(productId);
        fetchProducts();
    }

    const handleEditClick = (product) => {

        const editProductPath = `/edit-product/${product.id}`
        navigate(editProductPath, { state: product }, { replace: true },);

    }


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Product Reviews</h2>
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group my-">
                        {products.map((products) => (
                            <li key={products.id} className="list-group-item mb-3">
                                <div className='row'>
                                    <div className='col-lg-1 me-2'>
                                        <img width='50px' src={products.data.image} />
                                    </div>
                                    <div className='col'>
                                        <h4>{products.data.name}</h4>
                                        <p>{products.data.description}</p>

                                        <button className="btn btn-sm btn-primary mx-2" onClick={() => handleEditClick(products)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteProductView(products)}>Delete</button>
                                    </div>
                                </div>


                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="card d-flex flex-row p-2">
                        <Link to="/user-view/following-follows">Followers and following</Link>
                    </div>
                    <div className="card mt-2">
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