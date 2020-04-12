import React, { useState, createContext, useEffect } from 'react';
import usePages from '../components/common/customHooks/pageHook';
import useSorting from '../components/common/customHooks/sortingHook';
import UrlHelper from '../helpers/UrlHelper';
import Loading from '../components/common/loading/Loading';

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
    totalPages: 1,
  },
  itemsData: {
    items: [],
    itemsMounted: false,
    itemsLength: 0,
  },
};

const ItemContext = createContext(defaultValues);

const ItemContextProvider = ({ children }) => {
  const [itemsData, setItemsData] = useState(defaultValues.itemsData);
  const [mounted, setMounted] = useState(false);

  const { itemsLength } = itemsData;
  const pagingData = usePages({ itemsLength });
  const sortingData = useSorting(sortingTypes);

  const {
    setPageData,
    pageData,
  } = pagingData;

  const {
    page,
    perPage,
  } = pageData;

  useEffect(() => {
    const queryPage = UrlHelper.getIntParam('page', 1);
    const queryPerPage = UrlHelper.getIntParam('perPage', 24);

    const newPageData = {
      ...pageData,
      perPage: (queryPerPage === 48) ? queryPerPage : perPage,
      page: (queryPage !== page) ? queryPage : page,
    };

    setPageData({ ...newPageData });
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!mounted) return <Loading />;

  return (
    <ItemContext.Provider
      value={{
        pagingData,
        sortingData,
        itemsData,
        setItemsData,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

const ItemContextConsumer = ItemContext.Consumer;

export {
  ItemContext,
  ItemContextProvider,
  ItemContextConsumer,
};
