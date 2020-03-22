import React from 'react';

import { SearchField } from '../SearchField/SearchField';

export const Search = ({ handleKeySearch, handleChange, query }) => {
  return (
    <section className="app__search search">
      <SearchField
        query={query}
        handleChange={handleChange}
        handleKeySearch={handleKeySearch}
      />
    </section>
  );
};
