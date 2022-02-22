import History from './History';

const UrlHelper = {
  getQuery(location) {
    return new URLSearchParams(location.search);
  },

  getParam(param, res = '') {
    const { location } = window;
    const query = this.getQuery(location);
    return query.get(param) || res;
  },

  getIntParam(param, res = 0) {
    const queryParam = this.getParam(param);
    return parseInt(queryParam) || res;
  },

  deleteParam(param) {
    const { location } = window;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.delete(param);
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  setParam(param, value) {
    const { location } = window;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.set(param, value);
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  setParams(params) {
    const { location } = window;
    const { pathname } = location;
    const query = this.getQuery(location);
    params.forEach(({ name, value }) => {
      query.set(name, value);
    });
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },
};

export default UrlHelper;
