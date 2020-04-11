import { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const usePages = ({ items, location, history }) => {
  const [page, setPage] = useState(1);
  const itemsLength = items.length;
  const previousPage = usePrevious(page);
  const [perPage, setItemsPerPage] = useState(24);

  const resetPage = () => {
    setPage(1);
    const query = new URLSearchParams(location.search);
    const { pathname } = location;
    query.delete('page');
    const newUrl = `${pathname}?${query.toString()}`;
    history.push(newUrl);
  };

  const setPerPage = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setPage(1);
    const query = new URLSearchParams(location.search);
    const { pathname } = location;
    query.set('perPage', itemsPerPage);
    query.set('page', '1');
    const newUrl = `${pathname}?${query.toString()}`;
    history.push(newUrl);
  };

  const totalPages = Math.ceil(itemsLength / perPage) || 1;
  return {
    previousPage,
    page,
    setPage,
    perPage,
    itemsLength,
    totalPages,
    setItemsPerPage,
    setPerPage,
    resetPage,
  };
};

export default usePages;
