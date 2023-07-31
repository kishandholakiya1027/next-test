//common search input component
import React from 'react'
const SearchInput = ({ onChange, value }) => {
    return (
        <div className="flex items-center bg-white border rounded-lg shadow-md mb-3">
            <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 focus:outline-none"
                placeholder="Search by application or resource..."
                onChange={onChange}
                value={value}
            />

        </div>
    )
}

export default SearchInput