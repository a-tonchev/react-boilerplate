import { useEffect, useRef, useState } from 'react';
import UrlHelper from '../../../helpers/UrlHelper';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const sortingTypes = [
  {
    name: 'bestMatch',
    translation: 'sorting.bestMatch',
    directions: ['desc'],
  },
  {
    name: 'date',
    translation: 'sorting.date',
    directions: ['asc', 'desc'],
  },
  {
    name: 'price',
    translation: 'sorting.price',
    directions: ['asc', 'desc'],
  },
];

const perPageValues = [
  24,
  48,
];

const viewTypes = [
  'tiles',
  'list',
];

const defaultPageData = {
  page: 1,
  perPage: 24,
  sortBy: sortingTypes[0].name,
  sortDirection: sortingTypes[0].directions[0],
  view: viewTypes[0],
};

const useFilters = ({ itemsLength }) => {
  const [pageData, setPageData] = useState(defaultPageData);
  const { page, perPage } = pageData;
  const totalPages = Math.ceil(itemsLength / perPage) || 1;

  const setDataAttr = attr => value => {
    setPageData({
      ...pageData,
      [attr]: value,
    });
  };

  const previousPage = usePrevious(page);

  const resetPage = (newPage = 1) => {
    setDataAttr('page')(newPage);
    UrlHelper.deleteParam('page');
  };

  const setPerPage = (newPerPage) => {
    setPageData({
      ...pageData,
      perPage: newPerPage,
      page: 1,
    });
    UrlHelper.setParam('perPage', newPerPage);
    UrlHelper.setParam('page', 1);
  };

  const setSortBy = (sortBy, sortDirection) => {
    setPageData({
      ...pageData,
      sortBy: sortBy || pageData.sortBy,
      sortDirection: sortDirection || pageData.sortDirection,
    });
    UrlHelper.setParam('sortBy', sortBy);
    UrlHelper.setParam('sortDirection', sortDirection);
  };

  return {
    previousPage,
    totalPages,
    setPage: setDataAttr('page'),
    pageData,
    setPageData,
    setPerPage,
    setSortBy,
    resetPage,
  };
};

export { sortingTypes, perPageValues };
export default useFilters;
