import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/RestaurantService';
import RestaurantItem from '../components/RestaurantItem';
import FilterNavigation from '../components/FilterNavigation';

const MainPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); 
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // State untuk filter
    const [openNow, setOpenNow] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const data = await getRestaurants();
            setRestaurants(data);
            setCategories(data.map(restaurant => restaurant.categories).flat().filter((category, index, self) => self.indexOf(category) === index));
            setFilteredRestaurants(data); // Set awal
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {   
        fetchRestaurants();
    }, []);

    useEffect(() => {
        // Filter restoran berdasarkan kriteria
        let filtered = [...restaurants];

        // Filter berdasarkan Open Now
        if (openNow) {
            filtered = filtered.filter(restaurant => restaurant.is_open);
        }

        // Filter berdasarkan Price
        if (selectedPrice) {
            filtered = filtered.filter(restaurant => restaurant.price_range === selectedPrice);
        }

        // Filter berdasarkan Category
        if (selectedCategory) {
            filtered = filtered.filter(restaurant => restaurant.categories.includes(selectedCategory));
        }

        setFilteredRestaurants(filtered);
        setVisibleCount(8); // Reset visible count saat filter diterapkan
    }, [openNow, selectedPrice, selectedCategory, restaurants]);

    const handleMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(visibleCount + 8);
            setLoadingMore(false);
        }, 1000);
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='p-10'>
            <div className='space-y-5'>
                <h1 className='font-normal text-5xl'>Restaurants</h1>
                <h2 className='font-normal text-xl'>Below are some lists and details of restaurants</h2>
            </div>

            {/* Komponen Filter */}
            <hr className='my-5 border' />
                <FilterNavigation
                    openNow={openNow}
                    setOpenNow={setOpenNow}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                />
            <hr className='my-5 border' />

            {/* Daftar Restoran */}
            <RestaurantItem restaurant={Array.isArray(filteredRestaurants) ? filteredRestaurants.slice(0, visibleCount) : []} />
            <div className='flex justify-center mt-20'>
                {visibleCount < (Array.isArray(filteredRestaurants) ? filteredRestaurants.length : 0) && (
                    <button 
                        onClick={handleMore}
                        className='w-1/3 p-3 border-2 border-black font-normal'
                    >
                        {loadingMore ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );    
};

export default MainPage;
