import users from '../fakeData/users';

export default {
  getFakeLogin: (email) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find(u => u.email === email));
    }, 0);
  }),
};
