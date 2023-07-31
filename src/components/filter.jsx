import React from 'react'

const Filter = () => {
    return (
        <div className="flex justify-center space-x-4 py-4 bg-gray-100">
            {filters.map((filter, index) => (
                <button
                    key={index}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

export default Filter