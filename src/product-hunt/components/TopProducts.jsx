import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth/context/AuthContext';

import ProductView from './ProductView';

import iconUp from '../../assets/Home/icon-up.png';
import best from '../../assets/Home/best.jpg';
import './TopProducts.css';

export const TopProducts = () => {
    const { getAllProducts } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        const fetchedProducts = await getAllProducts();
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
    };

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
    }, []);



    return (
        <>
            {products.map((item) => (
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
                                {/* <img src={iconUp} width='20px' />
                                <div className="">{item.numberOfComments}</div> */}
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
