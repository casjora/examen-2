import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} /> 
      </Routes>
  )
}
