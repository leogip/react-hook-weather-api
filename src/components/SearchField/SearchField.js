import React from 'react';

import './SearchField.css';

export const SearchField = ({ query, handleChange, handleKeySearch }) => (
  <div className="search-box">
    <input
      type="text"
      className="search-bar"
      placeholder="Enter your city..."
      onChange={e => handleChange(e.target.value)}
      value={query}
      onKeyPress={handleKeySearch}
    />
  </div>
);
