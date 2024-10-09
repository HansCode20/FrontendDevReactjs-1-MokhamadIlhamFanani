import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurants } from '../services/RestaurantService';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const DetailView = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setTimeout(async() => {     
                    const data = await getRestaurants();
                    const restaurant = data.find((item) => item.id === parseInt(id));
                    setRestaurant(restaurant);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRestaurant();
    }, [id]);

    const calculatorRating = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i}/>);
            } else if (i - rating <= 0.5) {
                stars.push(<FaStarHalfAlt key={i}/>);
            } else {
                stars.push(<FaRegStar key={i}/>);
            }
        }
        return stars;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            {restaurant ? (
                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                    {/* Restaurant Name & Rating */}
                    <section className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>
                        <div className="flex items-center mt-2">
                            {calculatorRating(restaurant.rating)}
                            <span className="ml-2 text-gray-600">{restaurant.rating}</span>
                        </div>
                    </section>

                    {/* Restaurant Image */}
                    {restaurant.photos && (
                        <section className="mb-6">
                            <img
                                src={restaurant.photos}
                                alt={restaurant.name}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </section>
                    )}

                    {/* Customer Reviews Section */}
                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Customer Reviews</h2>
                        {restaurant.reviews && restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => (
                                <div key={index} className="flex items-center mb-4 p-4 ">
                                    <img
                                        src={review.photo}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                                        <div className="flex items-center">
                                            {calculatorRating(review.rating)}
                                            <span className="ml-2">{review.rating}</span>
                                        </div>
                                        <p className="text-gray-600">{review.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews available.</p>
                        )}
                    </section>
                </div>
            ) : (
                <p className="text-lg text-gray-600">Loading...</p>
            )}
        </div>
    );
};

export default DetailView;
