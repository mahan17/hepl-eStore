import React, { useState } from 'react';
import "./CategoryBar.css";
import { setCategory } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes, FaFilter } from 'react-icons/fa';

const CategoryBar = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const categories = useSelector(state => state.products.categories);
    const selectedCategory = useSelector(state => state.products.selectedCategory);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button (Bottom Right or Top Left per your choice) */}
            <button className="mobile-category-toggle" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <><FaFilter /> <span>Categories</span></>}
            </button>

            {/* Backdrop for sidebar */}
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            <div className={`category-bar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Shop by Category</h3>
                </div>
                <div className="category-container">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => {
                                dispatch(setCategory(cat));
                                setIsOpen(false); // Close sidebar on select
                            }}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CategoryBar;