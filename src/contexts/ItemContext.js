import React, {
  createContext, useReducer,
} from 'react';
import UrlHelper from '../helpers/UrlHelper';
import { viewTypes, sortingTypes } from '../config/ItemConfig';
import LocalStorage from '../helpers/LocalStorage';

const defaultValues = {
  items: [],
  itemsMounted: false,
  itemsLength: 0,
  page: 1,
  perPage: 24,
  sortBy: sortingTypes[0].name,
  sortDirection: sortingTypes[0].directions[0],
  view: viewTypes[0].name,
  mounted: false,
};

function reducer(state, action) {
  const { type, ...restActions } = action;

  switch (type) {
    case 'RESET_PAGE':
      UrlHelper.deleteParam('page');
      return {
        ...state,
        ...restActions,
      };
    case 'SET_PER_PAGE':
      UrlHelper.setParams([{
        name: 'perPage',
        value: restActions.perPage,
      },
      {
        name: 'page',
        value: 1,
      }]);
      return {
        ...state,
        perPage: restActions.perPage,
        page: 1,
      };
    case 'SET_SORT_BY':
      UrlHelper.setParams([{
        name: 'sortBy',
        value: restActions.sortBy || state.sortBy,
      },
      {
        name: 'sortDirection',
        value: restActions.sortDirection || state.sortDirection,
      }]);
      return {
        ...state,
        sortBy: restActions.sortBy || state.sortBy,
        sortDirection: restActions.sortDirection || state.sortDirection,
      };
    case 'CHANGE_VIEW':
      LocalStorage.save('view', restActions.view);
      return {
        ...state,
        ...restActions,
      };
    default:
      return {
        ...state,
        ...restActions,
      };
  }
}

const ItemContext = createContext(defaultValues);

const ItemContextProvider = ({ children }) => {
  const [itemsData, dispatchItemsData] = useReducer(reducer, defaultValues);

  return (
    <ItemContext.Provider
      value={{
        itemsData,
        dispatchItemsData,
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
