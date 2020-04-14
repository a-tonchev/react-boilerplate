import React, {
  createContext, useEffect, useReducer,
} from 'react';
import UrlHelper from '../helpers/UrlHelper';
import Loading from '../components/common/loading/Loading';
import { viewTypes, sortingTypes, perPageValues } from '../config/ItemConfig';
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
      UrlHelper.setParam('perPage', restActions.perPage);
      UrlHelper.setParam('page', 1);
      return {
        ...state,
        perPage: restActions.perPage,
        page: 1,
      };
    case 'SET_SORT_BY':
      UrlHelper.setParam('sortBy', restActions.sortBy || state.sortBy);
      UrlHelper.setParam('sortDirection', restActions.sortDirection || state.sortDirection);
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

  const {
    page,
    sortBy,
    sortDirection,
    mounted,
    view,
  } = itemsData;

  useEffect(() => {
    const queryPage = UrlHelper.getIntParam('page', 1);
    let queryPerPage = UrlHelper.getIntParam('perPage', perPageValues[0]);
    let querySortBy = UrlHelper.getParam('sortBy');
    const sortingType = sortingTypes.find(st => st.name === querySortBy);
    let querySortDirection = UrlHelper.getParam('sortDirection');
    const storedView = LocalStorage.get('view');
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
    const newItemData = {
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
      view: storedView || view,
      mounted: true,
    };

    dispatchItemsData(newItemData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!mounted) return <Loading />;

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
