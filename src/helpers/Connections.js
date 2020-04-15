import users from '../data/fakeData/users';
import pages from '../data/fakeData/pages';

const filterItems = (items, perPage, page) => {
  const totalPages = Math.ceil(items.length / perPage) || 1;
  const newPage = (page > totalPages) ? 1 : page;
  const newPageItems = items.filter(
    (item, index) => index >= (perPage * newPage - perPage)
      && index < perPage * newPage,
  );
  return {
    newPageItems,
    newPage,
  };
};

export default {
  getFakeLogin: (email) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find(u => u.email === email));
    }, 0);
  }),
  getFakeItem: pageId => new Promise((resolve) => {
    setTimeout(() => {
      resolve(pages.find(u => u.id === pageId));
    }, 0);
  }),
  getFakeItemsData: ({
    perPage,
    page,
    sortBy,
    sortDirection,
  }) => new Promise((resolve) => {
    setTimeout(() => {
      const {
        newPage,
        newPageItems,
      } = filterItems(
        pages,
        perPage,
        page,
        sortBy,
        sortDirection,
      );
      resolve({
        items: newPageItems,
        itemsLength: pages.length,
        newPage: newPage,
      });
    }, 0);
  }),
};
