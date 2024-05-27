import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductsAverageRating = () => {
    const { calculateGlobalRanting } = useContext(ProductContext);
    const [globalRating, setGlobalRating] = useState(0);

    useEffect(() => {
        const fetchAndCalculateAverageRating = async () => {
            const globalRatingResponse = await calculateGlobalRanting();
            setGlobalRating(Math.round((globalRatingResponse) * 100) / 100);
        }
        fetchAndCalculateAverageRating();
    }, [calculateGlobalRanting]);

    return (
        <div>

            <div className="card" >
                <div className="card-body text-center">
                    <h5>Average rating of products</h5>
                    <h3>{globalRating}</h3>
                </div>
            </div>

        </div>
    );
}

export default ProductsAverageRating;