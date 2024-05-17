import icon1 from '../../assets/Home/1416dd26-6580-47d9-899a-12726184b052.mp4'
import icon2 from '../../assets/Home/product-1.mp4'
import icon3 from '../../assets/Home/product-3.avif'
import icon4 from '../../assets/Home/product-4.avif'
import icon5 from '../../assets/Home/producto-5.avif'
import iconUp from '../../assets/Home/icon-up.png'
import best from '../../assets/Home/best.jpg'
import './TopProducts.css'
import { useContext } from "react";
import { ProductContext } from '../context/ProductContext';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';


export const TopProducts = () => {
    const { getAllProducts, deleteProduct } = useContext(ProductContext);
    const [products, setProducts] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newReview, setNewReview] = useState({ content: '', rate: 0 });
    const handleReviewChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
      };

    const fetchProducts = async () => {
        const fetchedProducts = await getAllProducts();
        console.log(fetchedProducts)
        setProducts(fetchedProducts);
    };

    const openModal = (product) => {
        console.log(product)
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products)




    const topProducts = [
        {
            iconUrl: icon1,
            typeOfIcon: 'video',
            nameOfProduct: 'Reflex',
            description: 'Build web apps in pure Python',
            numberOfComments: '128',
            categories: ['Web app', 'Open Source', 'Developer Tools']
        },
        {
            iconUrl: icon2,
            typeOfIcon: 'video',
            nameOfProduct: 'Collabwriting for Teams',
            description: 'The easiest way to capture, store, and find knowledge ',
            numberOfComments: '123',
            categories: ['Browser Extensions', 'Chrome Extentions', 'Productivity']
        },
        {
            iconUrl: icon3,
            typeOfIcon: 'image',
            nameOfProduct: 'Pullpo.io',
            description: 'Complete code reviwes in hours, not days, right from slack ',
            numberOfComments: '52',
            categories: ['Productivity,', 'Software Engineeering', 'Developer Tools']
        },
        {
            iconUrl: icon4,
            typeOfIcon: 'image',
            nameOfProduct: 'Latitude',
            description: 'Open-source framework for embedded analytics',
            numberOfComments: '37',
            categories: ['Open source,', 'GitHub', 'Developer Tools']
        },
        {
            iconUrl: icon5,
            typeOfIcon: 'image',
            nameOfProduct: 'Cascadeur',
            description: 'You can clean up and edit assets and mocap with AI',
            numberOfComments: '17',
            categories: ['Analytics', 'Artificial Inteligence', 'Developer Tools']
        }

    ]

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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles del Producto"
            >
                {selectedProduct && (
                    <div>
                        <div className='row'>
                            <div className='col-lg-3' ></div>
                            <div className=' col-lg-6'>
                                <img width='100px' src={selectedProduct.data.image} />
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <h3>{selectedProduct.data.name}</h3>
                                        <p>{selectedProduct.data.description}</p>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='d-flex'>
                                            <button className='btn btn-success mx-3'>Visit</button>
                                            <button className='btn btn-warning'>
                                                UPVOTE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <hr />
                                    <div className='col-lg-6'>
                                        <label>What do you think?</label>
                                     
                                    </div>
                                    <div className='col-lg-6 align-items-center d-flex'>
                                        <button className='btn btn-primary '>Login to comment</button>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>
                                    <label>Review</label>
                                <select className='form-control'
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
                                    <h3>Comments</h3>
                                    <textarea></textarea>
                                </div>

                            </div>


                        </div>
                        <div className='row mt-3'>
                            <div className='col-lg-12  d-flex justify-content-end '>
                                <button className='btn btn-warning' onClick={closeModal}>close</button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
            <div className='row'>
                <img src={best} className='w-100' />
            </div>


        </>
    )


}