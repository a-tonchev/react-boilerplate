import React, { useState, createContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import usePages from '../components/common/customHooks/pageHook';
import useSorting from '../components/common/customHooks/sortingHook';

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

const defaultValues = {
  sortingData: {
    sortBy: sortingTypes[0].name,
    sortingTypes,
    sortDirection: sortingTypes[0].directions[0],
  },
  pagingData: {
    page: 1,
    setPage: () => {},
    perPage: 24,
    setPerPage: () => {},
    itemsLength: 0,
    totalPages: 0,
  },
};

const ItemContext = createContext(defaultValues);

const ItemContextProvider = ({ children, location, history }) => {
  const [preparedItems, setPreparedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [itemsMounted, setItemsMounted] = useState(false);

  const pagingData = usePages({ items: allItems, location, history });
  const sortingData = useSorting(sortingTypes);

  const query = new URLSearchParams(location.search);
  const queryPage = parseInt(query.get('page'), 10) || 1;
  const queryPerPage = parseInt(query.get('perPage'), 10) || 24;

  const {
    totalPages,
    page,
    setPage,
    itemsLength,
    setItemsPerPage,
    resetPage,
  } = pagingData;

  useEffect(() => {
    if (!itemsMounted && preparedItems.length) setItemsMounted(true);
  }, [preparedItems]);

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0 });
    if (page > totalPages && (itemsLength || itemsMounted)) {
      resetPage();
    }
  }, [page, totalPages, itemsLength]);

  useEffect(() => {
    if (queryPage !== page) setPage(queryPage);
    if (queryPerPage === 48) setItemsPerPage(queryPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ItemContext.Provider
      value={{
        pagingData,
        sortingData,
        preparedItems,
        setPreparedItems,
        allItems,
        setAllItems,
        itemsMounted,
        setItemsMounted,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

const ItemContextConsumer = ItemContext.Consumer;

const routedItemContextProvider = withRouter(ItemContextProvider);

export {
  ItemContext,
  routedItemContextProvider as ItemContextProvider,
  ItemContextConsumer,
};
