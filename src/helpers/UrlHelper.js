import History from './History';

export default class UrlHelper {
  static getQuery(location) {
    return new URLSearchParams(location.search);
  }

  static getParam(param, res = '') {
    const { location } = History;
    const query = this.getQuery(location);
    return query.get(param) || res;
  }

  static getIntParam(param, res = 0) {
    const queryParam = this.getParam(param);
    return parseInt(queryParam) || res;
  }

  static deleteParam(param) {
    const { location } = History;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.delete(param);
    const newUrl = `${pathname}?${query.toString()}`;
    History.push(newUrl);
  }

  static setParam(param, value) {
    const { location } = History;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.set(param, value);
    const newUrl = `${pathname}?${query.toString()}`;
    History.push(newUrl);
  }

  static setParams(params) {
    const { location } = History;
    const { pathname } = location;
    const query = this.getQuery(location);
    params.forEach(({ name, value }) => {
      query.set(name, value);
    });
    const newUrl = `${pathname}?${query.toString()}`;
    History.push(newUrl);
  }
}
