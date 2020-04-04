import users from '../data/fakeData/users';
import pages from '../data/fakeData/pages';

export default {
  getFakeLogin: (email) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find(u => u.email === email));
    }, 0);
  }),
  getFakePages: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(pages);
    }, 0);
  }),
  getFakePage: pageId => new Promise((resolve) => {
    setTimeout(() => {
      resolve(pages.find(u => u.id === pageId));
    }, 0);
  }),
};
