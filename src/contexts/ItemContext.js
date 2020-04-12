import React, { useState, createContext, useEffect } from 'react';
import useFilters, { sortingTypes, perPageValues } from '../components/common/customHooks/filtersHook';
import UrlHelper from '../helpers/UrlHelper';
import Loading from '../components/common/loading/Loading';

const defaultValues = {
  sortingData: {
    sortBy: sortingTypes[0].name,
    sortingTypes,
    sortDirection: sortingTypes[0].directions[0],
  },
  filtersData: {
    page: 1,
    setPage: () => {},
    perPage: perPageValues[0],
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
  const filtersData = useFilters({ itemsLength });

  const {
    setPageData,
    pageData,
  } = filtersData;

  const {
    page,
    perPage,
    sortBy,
    sortDirection,
  } = pageData;

  useEffect(() => {
    const queryPage = UrlHelper.getIntParam('page', 1);
    let queryPerPage = UrlHelper.getIntParam('perPage', perPageValues[0]);
    let querySortBy = UrlHelper.getParam('sortBy');
    const sortingType = sortingTypes.find(st => st.name === querySortBy);
    let querySortDirection = UrlHelper.getParam('sortDirection');

    if (!perPageValues.includes(queryPerPage)) {
      [queryPerPage] = perPageValues;
      UrlHelper.setParam('perPage', queryPerPage);
    }

    if (sortingType) {
      querySortDirection = !sortingType.directions.includes(querySortDirection)
        ? sortingType.directions[0]
        : querySortDirection;
      UrlHelper.setParam('sortDirection', querySortDirection);
    } else {
      querySortBy = '';
      querySortDirection = '';
      UrlHelper.deleteParam('sortBy');
      UrlHelper.deleteParam('sortDirection');
    }
    const newPageData = {
      ...pageData,
      perPage: queryPerPage,
      page: (queryPage !== page) ? queryPage : page,
      sortBy: (
        querySortBy &&
        querySortBy !== sortBy
      ) ? querySortBy : sortBy,
      sortDirection: (
        querySortDirection &&
        querySortDirection !== sortDirection
      ) ? querySortDirection : sortDirection,
    };

    setPageData({ ...newPageData });
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!mounted) return <Loading />;

  return (
    <ItemContext.Provider
      value={{
        filtersData,
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
