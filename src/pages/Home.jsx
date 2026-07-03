import React from 'react';
import useProducts from '../hooks/useProducts'; 
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard'


const Home = () => {
    const { products, loading, error } = useProducts('https://fakestoreapi.com/products');
    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>; 

    return (
        <div className="flex flex-col min-h-screen"> 
            <Appbar />

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                         <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Home;