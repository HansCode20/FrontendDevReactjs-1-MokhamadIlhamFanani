import React from 'react';

const FilterNavigation = ({ openNow, setOpenNow, selectedPrice, setSelectedPrice, selectedCategory, setSelectedCategory, categories }) => {
    const handleClearFilter = () => {
        setOpenNow(false);
        setSelectedPrice('');
        setSelectedCategory('');
    };
    

    return (
        <div className='my-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-5 w-full md:w-auto'>
                <h3 className='font-normal text-md'>Filter By:</h3>
                <div className='flex items-center'>
                    <label className='mr-2 flex items-center gap-1 border-b border-gray-300'>
                        <input 
                            type='checkbox' 
                            checked={openNow} 
                            onChange={() => setOpenNow(!openNow)} 
                        />
                        Open Now
                    </label>
                </div>
                <div className='my-2 w-full md:w-auto border-b border-gray-300'>
                    <select className='w-full md:w-auto' value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                        <option value=''>Price</option>
                        <option value='$$'>$$</option>
                        <option value='$$$'>$$$</option>
                        <option value='$$$$'>$$$$</option>
                    </select>
                </div>
                <div className='my-2 w-full md:w-auto border-b border-gray-300'>
                    <select className='w-full md:w-auto' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value=''>Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='border border-gray-300 w-full md:w-40 text-center'>
                <button 
                className='p-3 w-full text-gray-500'
                onClick={handleClearFilter}
                >
                    CLEAR ALL
                </button>
            </div>
        </div>
    );
};

export default FilterNavigation;
