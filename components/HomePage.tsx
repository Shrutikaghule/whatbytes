"use client"
import React from 'react'
import ProductCard from './ProductCard'
import { useState } from 'react';
import { PRODUCTS } from '@/data/product';
import { Category } from '@/types/product';
import { useMemo } from 'react';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [secondaryCategory, setSecondaryCategory] = useState<Category>('All');
  const [secondaryPriceInput, setSecondaryPriceInput] = useState('5000');
  
    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((item) => {
          // 1. Search Query
          if (searchTerm.trim() !== '') {
            const q = searchTerm.toLowerCase();
            const matches =
              item.name.toLowerCase().includes(q) ||
              item.category.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q);
            if (!matches) return false;
          }
    
          // 2. Primary Category
          if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            return false;
          }
    
          // 3. Secondary Category
          if (secondaryCategory !== 'All' && item.category !== secondaryCategory) {
            return false;
          }
    
          // 4. Slider Price
          if (item.price > maxPrice) {
            return false;
          }
    
          // 5. Secondary numeric price
          if (secondaryPriceInput && !isNaN(Number(secondaryPriceInput))) {
            if (item.price > Number(secondaryPriceInput)) {
              return false;
            }
          }
    
          return true;
        });
      }, [searchTerm, selectedCategory, secondaryCategory, maxPrice, secondaryPriceInput]);
    const regularProducts = filteredProducts.filter((p) => !p.featured);
  return (
    <div className="max-w-7xl max-h-full bg-white text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                
              </div>
    </div>
  )
}

export default HomePage