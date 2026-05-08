import BasicConfig from '@/components/config/BasicConfig';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import i18n from '@/components/translations/i18n';

import tokenStore from './stores/tokenStore';
import UrlEnums from './enums/UrlEnums';
import History from './History';

const getServerHost = () => {
  if (BasicConfig.HOST_SAME_URL) {
    return window.location.hostname;
  }
  return BasicConfig.SERVER_HOST;
};

const buildBaseURL = () => {
  const host = getServerHost();
  const port = BasicConfig.SERVER_PORT ? `:${BasicConfig.SERVER_PORT}` : '';
  return `${BasicConfig.SERVER_PROTOCOL}://${host}${port}${BasicConfig.SERVER_PATH}/${BasicConfig.API_VERSION}`;
};

const baseURL = buildBaseURL();

export const ApiEndpoints = {
  login: '/users/login',
  logout: '/users/logout',
  signUp: '/users/signUp',
  passwordResetRequest: '/users/resetRequest',
  resetPassword: '/users/resetPassword',
  sendUserVerificationEmail: '/users/sendVerification',
  verifyAccount: '/users/verify',
  getOwnProfile: '/users/ownProfile',
  updateOwnProfile: '/users/updateOwnProfile',
  updatePassword: '/users/updatePassword',
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

const getAuthHeaders = () => {
  const token = tokenStore.get();
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const connectionSuccessResponse = data => {
  if (BasicConfig.system?.debug) {
    console.info('---success---');
    console.info(data);
  }
  if (!data || !data.ok) {
    return { ok: false };
  }

  return {
    ok: true,
    data: data.data,
  };
};

const connectionErrorResponse = (status, responseData) => {
  let errorMessage = i18n.t('error.unknown');
  if (BasicConfig.system?.debug) {
    console.error('---error---');
    console.error(status, responseData);
  }
  let errorData = null;
  let errorCode = null;

  if (responseData) {
    if (responseData.code) {
      if (i18n.exists(`error.${responseData.code}`)) {
        errorMessage = i18n.t(`error.${responseData.code}`);
      }
      errorCode = responseData.code;
    }

    if (responseData.data) {
      errorData = responseData.data;
    }
    if (status === 401) {
      Storage.getObject(StorageEnums.token).then(
        tokenStored => {
          (async () => {
            const tokenPromise = Storage.remove(StorageEnums.token);
            const udPromise = Storage.remove(StorageEnums.userData);

            await Promise.all([tokenPromise, udPromise]);
            if (tokenStored) {
              window.location.reload();
            } else {
              History.navigate(UrlEnums.LOGIN);
            }
          })();
        },
      );
    } else if (status === 403) {
      History.navigate(UrlEnums.MAIN);
    }
  }
  return {
    ok: false,
    errorCode,
    errorMessage,
    errorData,
    online: status != null,
  };
};

const handleResponse = async response => {
  const data = await response.json();
  if (response.ok) {
    return connectionSuccessResponse(data);
  }
  return connectionErrorResponse(response.status, data);
};

export default {
  async post({
    url, params, path = '',
  }) {
    try {
      const headers = getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const response = await fetch(getUrl(url) + path, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });
      return handleResponse(response);
    } catch (error) {
      return connectionErrorResponse(null, null);
    }
  },
  async get({
    url, params, suppressError,
  }) {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`${getUrl(url)}${params ? '?' : ''}${encodeQueryData(params)}`, {
        headers,
      });
      return handleResponse(response);
    } catch (error) {
      if (!suppressError) return connectionErrorResponse(null, null);
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
