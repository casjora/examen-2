import React from 'react'
import { Link } from 'react-router'

export default function ProductCard({ product }) {
    if (!product) return null
    return (
        <div  className="border rounded-lg shadow-md p-4 relative">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <p className="text-gray-800 font-bold mb-2">${product.price}</p>
            <div className="mt-4">
                <span className="text-yellow-500 font-bold">{product.rating.rate}</span>
                <span className="text-gray-600 text-sm ml-2">
                    ({product.rating.count} reviews)
                </span>
            </div>
            <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                <span aria-hidden="true" className="absolute inset-0"></span> 
            </Link>

        </div>
    )
}
