import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth/context/AuthContext';

import ProductView from './ProductView';

import iconUp from '../../assets/Home/icon-up.png';
import best from '../../assets/Home/best.jpg';
import './TopProducts.css';

export const TopProducts = () => {
    const { getAllProducts, getCommentCount, getFollowersAndFollowings } = useContext(ProductContext);

    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [products, setProducts] = useState([]);
    const [commentCounts, setCommentCounts] = useState({});
    const { user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCommentCounts = async () => {
            const counts = {};
            for (const product of products) {
                counts[product.id] = await getCommentCount(product.id);
            }
            setCommentCounts(counts);
        };

        fetchCommentCounts();
    }, [products]);

    useEffect(() => {
        const fetchFollowersAndFilterProducts = async () => {
            if (user) {
                const { following } = await getFollowersAndFollowings(user.uid);
                console.log(products)
                console.log(following)
                const filteredProductsByFollowedUsers = products.filter(product =>
                    following?.includes(product.data.userId)
                );
                
                const remainingProducts = products.filter(product =>
                    !following.includes(product.data.userId)
                );
                const updatedProductsList = filteredProductsByFollowedUsers.concat(remainingProducts);
                console.log(updatedProductsList)
             
                setFilteredProducts(updatedProductsList);
               
            } else {
                setFilteredProducts(products);
            }
        };

        fetchFollowersAndFilterProducts();
        
    }, [products, user, getFollowersAndFollowings]);

    

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchCategory = category === '' || product.data.category === category;
            const matchName = name === '' || product.data.name.toLowerCase().includes(name.toLowerCase());
            return matchCategory && matchName;
        });
        setFilteredProducts(filtered);
    }, [category, name, products]);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalIsOpen(false);
    };

    const categories = [
        "Electronics",
        "Home and Kitchen",
        "Fashion and Accessories",
        "Health and Beauty",
        "Sports and Outdoors",
        "Toys and Games",
        "Books and Media",
        "Automotive and Motorcycles",
        "Baby and Kids",
        "Food and Beverages",
        "Pets",
        "Tools and Home Improvement",
        "Office Supplies and Stationery",
        "Travel and Luggage",
        "Industrial and Scientific"
    ];

    return (
        <>
            <div className='row py-2'>
                <h5>Filter Products</h5>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <label className='py-1'>Category:</label>
                        <select className='form-control' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex flex-column'>
                        <label className='py-1'>Name:</label>
                        <select className='form-control' value={name} onChange={(e) => setName(e.target.value)}>
                            <option value="">Select a name</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.data.name}>{item.data.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex flex-column'>
                        <label className='py-1'>Rating:</label>
                        <select className='form-control' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="">Select a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredProducts.map((item) => (
                <div key={item.id} onClick={() => openModal(item)} className="row product d-flex align-items-center">
                    <div className="col-md-1 me-3">
                        <img width='48px' src={item.data.image} alt={item.data.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="py-3 my-2">
                            <label><b>{item.data.name}</b> — {item.data.description}</label>
                            <div className="sub-description-product fs-6">
                                {/* Placeholder for additional product information */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2 text-center'>
                        <button type="button" className="buttom-up">
                            <div className="flex flex-col items-center">
                                <img src={iconUp} width='20px' alt="icon up" />
                                <div className="">{commentCounts[item.id] || 0}</div>
                            </div>
                        </button>
                    </div>
                </div>
            ))}

            {selectedProduct && (
                <ProductView
                    product={selectedProduct}
                    isOpen={modalIsOpen}
                    onClose={handleCloseModal}
                />
            )}

            <div className='row py-5'>
                <img src={best} className='w-100' alt="best" />
            </div>
        </>
    );
};
