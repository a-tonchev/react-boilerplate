import { useEffect, useRef, useState } from 'react';
import UrlHelper from '../../../helpers/UrlHelper';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const defaultPageData = {
  page: 1,
  perPage: 24,
};

const usePages = ({ itemsLength }) => {
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

  return {
    previousPage,
    totalPages,
    setPage: setDataAttr('page'),
    pageData,
    setPageData,
    setPerPage,
    resetPage,
  };
};

export default usePages;
