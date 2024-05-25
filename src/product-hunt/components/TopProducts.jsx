import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth/context/AuthContext';

import ProductView from './ProductView';

import iconUp from '../../assets/Home/icon-up.png';
import best from '../../assets/Home/best.jpg';
import './TopProducts.css';

export const TopProducts = () => {
    const { getAllProducts, getCommentCount } = useContext(ProductContext);

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

    const handleFilterChange = () => {
        fetchProducts();
    }

    useEffect(() => {
        handleFilterChange();
    }, [category, name, rating]);


    let filterProducts = () => {
        setFilteredProducts(products.filter(product => {
            const matchCategory = category === '' || product.category === category;
            const matchName = name === '' || product.name.toLowerCase().includes(name.toLowerCase());
            return matchCategory && matchName
        }));
    };


    useEffect(() => {
        const fetchCommentCounts = async () => {
            const counts = {};
            for (const product of products) {
                counts[product.id] = await getCommentCount(product.id);
            }
            setCommentCounts(counts);
        };

        fetchCommentCounts();
    }, [products, getCommentCount]);

    useEffect(() => {
        setFilteredProducts(products.filter(product => {
            console.log(name)
            const matchCategory = category === '' || product.data.category === category;
            const matchName = name === '' || product.data.name.toLowerCase().includes(name.toLowerCase());
            return matchCategory && matchName
        }));
    }, [category, name, products]);


    const openModal = (product) => {
        console.log(product);
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalIsOpen(false);
    };

    useEffect(() => {
        fetchProducts();
        console.log(filteredProducts)

    }, []);

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
                <div className=' d-flex justify-content-between'>
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
                            )
                            )}
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
                        <img width='48px' src={item.data.image} />
                    </div>
                    <div className="col-md-8">
                        <div className="py-3 my-2">
                            <label><b>{item.data.name}</b> — {item.data.description}</label>
                            <div className="sub-description-product fs-6">
                                {/* <svg width='16px' xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 13 12"><path d="M10.99 5.126c0-2.422-2.236-4.376-5-4.376S1 2.714 1 5.126C1 7.537 3.236 9.5 6 9.5c.288 0 .576-.028.854-.076l.029.038 3.416 1.287-.182-2.05c-.058-.6.106-1.182.394-1.715A3.9 3.9 0 0 0 11 5.115l-.01.01Z"></path></svg>
                                {item.numberOfComments}{item.categories.map(e => (<label>{' • ' + e}</label>))} */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2 text-center'>
                        <button type="button" data-test="vote-button" className="buttom-up">
                            <div className="flex flex-col items-center">
                                <img src={iconUp} width='20px' />
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

            <div className='row'>
                <img src={best} className='w-100' />
            </div>
        </>
    );
};
