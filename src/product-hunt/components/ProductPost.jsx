
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext"
import { ProductContext } from '../context/ProductContext';
import { useForm } from '../hooks/useForm';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const styleCard = {
    with: '18rem'
}

const newProduct = {
    _id: '',
    name: '',
    description: '',
    url: '',
    userId: '',
    image: '',
    createdAt: '',
    updatedAt: ''
}



export const ProductPost = () => {
    const categories = {
        "categories": [
            {
                "name": "Electronics",
                "subcategories": [
                    "Mobile Phones",
                    "Laptops",
                    "Tablets",
                    "Televisions",
                    "Cameras",
                    "Electronic Accessories"
                ]
            },
            {
                "name": "Home and Kitchen",
                "subcategories": [
                    "Furniture",
                    "Decor",
                    "Appliances",
                    "Kitchenware",
                    "Bedding",
                    "Lighting"
                ]
            },
            {
                "name": "Fashion and Accessories",
                "subcategories": [
                    "Men's Clothing",
                    "Women's Clothing",
                    "Footwear",
                    "Jewelry",
                    "Bags",
                    "Watches"
                ]
            },
            {
                "name": "Health and Beauty",
                "subcategories": [
                    "Makeup",
                    "Skincare",
                    "Haircare",
                    "Nutritional Supplements",
                    "Exercise Equipment"
                ]
            },
            {
                "name": "Sports and Outdoors",
                "subcategories": [
                    "Sportswear",
                    "Camping Equipment",
                    "Bicycles",
                    "Fishing Gear",
                    "Hiking Gear",
                    "Gym Equipment"
                ]
            },
            {
                "name": "Toys and Games",
                "subcategories": [
                    "Educational Toys",
                    "Board Games",
                    "Outdoor Toys",
                    "Video Games",
                    "Dolls and Action Figures"
                ]
            },
            {
                "name": "Books and Media",
                "subcategories": [
                    "Physical Books",
                    "E-books",
                    "Magazines",
                    "Music",
                    "Movies and TV Shows"
                ]
            },
            {
                "name": "Automotive and Motorcycles",
                "subcategories": [
                    "Car Accessories",
                    "Automotive Tools",
                    "Spare Parts",
                    "Helmets and Protective Gear"
                ]
            },
            {
                "name": "Baby and Kids",
                "subcategories": [
                    "Baby Clothing",
                    "Baby Toys",
                    "Car Seats",
                    "Strollers",
                    "Diapers and Wipes"
                ]
            },
            {
                "name": "Food and Beverages",
                "subcategories": [
                    "Gourmet Food",
                    "Snacks",
                    "Alcoholic Beverages",
                    "Non-Alcoholic Beverages",
                    "Dietary Supplements"
                ]
            },
            {
                "name": "Pets",
                "subcategories": [
                    "Pet Food",
                    "Pet Toys",
                    "Pet Accessories",
                    "Pet Clothing",
                    "Pet Hygiene Products"
                ]
            },
            {
                "name": "Tools and Home Improvement",
                "subcategories": [
                    "Power Tools",
                    "Hand Tools",
                    "Garden Equipment",
                    "Building Materials",
                    "Paint Products"
                ]
            },
            {
                "name": "Office Supplies and Stationery",
                "subcategories": [
                    "Office Supplies",
                    "Office Furniture",
                    "Stationery",
                    "Office Equipment",
                    "Art and Craft Supplies"
                ]
            },
            {
                "name": "Travel and Luggage",
                "subcategories": [
                    "Suitcases",
                    "Backpacks",
                    "Travel Bags",
                    "Travel Accessories",
                    "Travel Organizers"
                ]
            },
            {
                "name": "Industrial and Scientific",
                "subcategories": [
                    "Lab Equipment",
                    "Measuring Instruments",
                    "Safety Equipment",
                    "Industrial Materials",
                    "Medical Supplies"
                ]
            }
        ]
    };


    const { saveProduct } = useContext(ProductContext)
    const { user } = useContext(AuthContext);

    const [imageProduct, setImageProduct] = useState();

    const { name, description, url, image, onInputChange } = useForm(newProduct);

    const [imageUpload, setImageUpload] = useState();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory('');
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };


    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `products-images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Image of product was upload')
            getDownloadURL(imageRef).then((url) => {
                setImageProduct(url)
            })
                .catch((error) => {
                    console.error('Error fetching download URL:', error);
                });
        })
    }



    const handleSubmitReview = () => {
        console.log(user)
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const product = {
            name: name,
            description: description,
            url: url,
            userId: user.uid,
            image: imageProduct,
            createdAt: datetime,
            updateAt: '',
            category: selectedCategory,
            subCategory: selectedSubcategory,
        }
        console.log(product)
        saveProduct(product);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className='col-6'>
                    <div className="card" >
                        <img className="card-img-top" style={styleCard} src={imageProduct} />
                        <div className="card-body">
                            <h5 className="card-title">Upload image of product</h5>
                            <div className='d-flex flex-column'>
                                <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                <div className='py-2'>
                                    <button className='btn  btn-primary' onClick={uploadImage}>Upload image</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="card-body">
                        <h5 className=" card-title mb-3">Name of product</h5>
                        <input type='text' id='name' name='name' className='form-control' value={name} onChange={onInputChange} />
                    </div>
                    <div>
                        <h5 className='py-2'>Select Product Categories</h5>
                        <div>
                            <label className='me-2 py-1' htmlFor="category">Category: </label>
                            <select id="category" className='form-control' value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {categories.categories.map((category, index) => (
                                    <option key={index} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedCategory && (
                            <div>
                                <label className='py-3 me-2' htmlFor="subcategory">Subcategory: </label>
                                <select id="subcategory" className='form-control' value={selectedSubcategory} onChange={handleSubcategoryChange}>
                                    <option value="">Select a subcategory</option>
                                    {categories.categories
                                        .find((category) => category.name === selectedCategory)
                                        .subcategories.map((subcategory, subIndex) => (
                                            <option key={subIndex} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        {selectedCategory && selectedSubcategory && (
                            <div>
                                <label className='py-1'>Selected Category: {selectedCategory}</label><br/>
                                <label >Selected Subcategory: {selectedSubcategory}</label>
                            </div>
                        )}
                    </div>

                    <div className='col-6'>
                        <h5 className='py-3 card-title'>Description</h5>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={onInputChange}
                            rows={4}
                        />
                    </div>
                    <div className='col-6'>
                        <h5 className='py-3 card-title'>Url of product</h5>
                        <input type='text' id='url' name='url' className='form-control' value={url} onChange={onInputChange} />
                    </div>
                    <div className='col-6'>
                        <div className='py-3'>
                            <button type="button" className="btn  btn-primary" onClick={handleSubmitReview}>Send your review</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mt-4">
                <div className='col-lg-2'></div>

            </div>
        </div>
    );

}

