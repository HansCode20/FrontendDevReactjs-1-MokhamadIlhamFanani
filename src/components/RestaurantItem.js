import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RestaurantItem = ({ restaurant }) => {
    // Logic menampilkan bintang sesuai Number
    const calculatorRating = (rating) => {
        let star = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                star.push(<FaStar key={i} />);
            } else if (i - rating <= 0.5 && i - rating > 0) {
                star.push(<FaStarHalfAlt key={i} />);
            } else {
                star.push(<FaRegStar key={i} />);
            }
        }
        return star;
    }

    return (
        <div>
            <h1 className='font-normal text-4xl mb-5 mt-20'>All Restaurants</h1>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
                {restaurant.map((restaurant) => (
                    <section key={restaurant.id} className='space-y-2 bg-white p-4'>
                        <img src={restaurant.photos} alt={restaurant.name} className='w-full h-64 object-cover' />
                        <h2 className='font-semibold text-xl'>{restaurant.name}</h2>
                        <div className='flex'>
                            {calculatorRating(restaurant.rating)}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1'>
                                <p>{restaurant.categories[0]}</p>
                                •
                                <p>{restaurant.price_range}</p>
                            </div>
                            {restaurant.is_open ? (
                                <div className='flex items-center space-x-2'>
                                    <span className='text-green-500 text-3xl'>•</span>
                                    <span>Open</span>
                                </div>
                            ) : (
                                <div className='flex items-center space-x-2'>
                                    <span className='text-red-500 text-3xl'>•</span>
                                    <span>Close</span>
                                </div>
                            )}
                        </div>
                        <Link to={`/${restaurant.id}`}>
                            <button className='w-full p-3 text-center text-white bg-[#002b56] rounded hover:bg-[#004080] transition'>Learn more</button>
                        </Link>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default RestaurantItem;
