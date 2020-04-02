import users from '../data/fakeData/users';

export default {
  getFakeLogin: (email) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find(u => u.email === email));
    }, 0);
  }),
};
