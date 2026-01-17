import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../store/searchSlice';
import './searchbar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.search.query);

  const onChangeHandler = (e) => {
    dispatch(searchActions.setSearchQuery(e.target.value));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={query}
        onChange={onChangeHandler}
      />
      {query && (
        <button
          className="clear-btn"
          onClick={() => dispatch(searchActions.clearSearch())}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;