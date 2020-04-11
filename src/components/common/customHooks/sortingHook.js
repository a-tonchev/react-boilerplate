import { useState } from 'react';

const useSorting = (sortingTypes) => {
  const [sortBy, setSortBy] = useState(sortingTypes[0].name);
  const [sortDirection, setSortDirection] = useState('desc');

  const changeSorting = (newSortBy, newDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  return {
    sortBy,
    sortDirection,
    sortingTypes,
    changeSorting,
  };
};

export default useSorting;
