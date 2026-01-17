import React from 'react'
import "./CategoryBar.css"
import { setCategory } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const CategoryBar = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.products.categories);
    const selectedCategory = useSelector(state => state.products.selectedCategory);

  return (
    <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat.toUpperCase()}
          </button>
        ))}
    </div>
  )
}

export default CategoryBar;