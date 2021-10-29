import axios from 'axios';

import BasicConfig from '@/components/config/BasicConfig';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import i18n from '@/components/translations/i18n';

import tokenStore from './stores/tokenStore';
import UrlEnums from './enums/UrlEnums';
import history from './History';

const baseURL = `${BasicConfig.SERVER_URL}/${BasicConfig.API_VERSION}`;

export const ApiEndpoints = {
  login: '/users/login',
  logout: '/users/logout',
  signUp: '/users/signUp',
  passwordResetRequest: '/users/resetRequest',
  resetPassword: '/users/resetPassword',
  sendUserVerificationEmail: '/users/sendVerification',
  verifyAccount: '/users/verify',
};

const getUrl = endpointPath => {
  if (endpointPath) return `${baseURL}${endpointPath}`;
  console.error('Url does not exist!', endpointPath);
  throw new Error('Url does not exist!');
};

const encodeQueryData = data => {
  const ret = [];
  for (const d in data) ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
  return ret.join('&');
};

const getLoginHeader = async () => {
  const token = tokenStore.get();
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return {
    headers,
  };
};

const connectionSuccessResponse = response => {
  if (BasicConfig.system?.debug) {
    console.log('---success---');
    console.log(response);
  }
  if (!response || !response.data?.ok) {
    return { ok: false };
  }

  return {
    ok: true,
    data: response.data.data,
  };
};

const connectionErrorResponse = error => {
  let errorMessage = i18n.t('error.unknown');
  if (BasicConfig.system?.debug) {
    console.log('---error---');
    console.log(error);
  }
  let errorData = null;
  let errorCode = null;

  if (error && error.response && error.response.data) {
    const responseError = error.response.data;

    if (responseError.code) {
      if (
        responseError.code
        && i18n.exists(`error.${responseError.code}`)
      ) {
        errorMessage = i18n.t(`error.${responseError.code}`);
      }
      errorCode = responseError.code;
    }

    if (responseError.data) {
      errorData = responseError.data;
    }
    if (error.response.status === 401) {
      Storage.getObject(StorageEnums.token).then(
        tokenStored => {
          (async () => {
            const tokenPromise = Storage.remove(StorageEnums.token);
            const udPromise = Storage.remove(StorageEnums.userData);

            await Promise.all([tokenPromise, udPromise]);
            if (tokenStored) {
              window.location.reload();
            } else {
              history.push(UrlEnums.LOGIN);
            }
          })();
        },
      );
    } else if (error.response.status === 403) {
      history.push(UrlEnums.MAIN);
    }
  }
  return {
    ok: false,
    errorCode,
    errorMessage,
    errorData,
    online: !!error.response,
  };
};

export default {
  async post({
    url, params, path = '',
  }) {
    try {
      const loginHeader = await getLoginHeader();
      const result = await axios.post(getUrl(url) + path, params, loginHeader);
      return connectionSuccessResponse(result);
    } catch (error) {
      return connectionErrorResponse(error);
    }
  },
  async get({
    url, params, suppressError,
  }) {
    try {
      const loginHeader = await getLoginHeader();
      const result = await axios.get(`${getUrl(url)}${params ? '?' : ''}${encodeQueryData(params)}`, loginHeader);
      return connectionSuccessResponse(result);
    } catch (error) {
      if (!suppressError) return connectionErrorResponse(error);
    }
  },
  async getRequest(url, params) {
    return this.get({
      url,
      params,
    });
  },
  async postRequest(url, params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.post({
          url,
          params,
        }));
      }, 0);
    });
  },
};
