import BasicConfig from '@/components/config/BasicConfig';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import StringHelper from '@/components/helpers/StringHelper';
import i18n from '@/components/translations/i18n';
import { logoutUser } from '@/screens/users/stores/userStore';

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

let handlingUnauthorized = false;

const handleUnauthorized = async sentToken => {
  // Guard against concurrent 401s so we don't reload/navigate more than once.
  if (handlingUnauthorized) return;
  handlingUnauthorized = true;

  const storedRaw = await Storage.get(StorageEnums.token);
  const storedToken = storedRaw ? StringHelper.decode(storedRaw) : '';

  // Only a 401 for the token that is actually stored is a real logout. A
  // mismatch means this tab is out of date (its in-memory token is older than
  // the session a newer login saved) — reload so the tab re-hydrates the fresh
  // session instead of destroying it.
  if (storedToken && sentToken !== storedToken) {
    window.location.reload();
    return;
  }

  // Clear the in-memory bearer token AND the logged-in store, not just
  // storage, otherwise the app keeps sending the dead token and the
  // Public route bounces the user back in an infinite redirect loop.
  tokenStore.remove();
  await logoutUser();
  if (storedToken) {
    window.location.reload();
  } else {
    History.navigate(UrlEnums.LOGIN);
    handlingUnauthorized = false;
  }
};

const connectionErrorResponse = (status, responseData, sentToken) => {
  let errorMessage = i18n.t('error.unknown');
  if (BasicConfig.system?.debug) {
    console.error('---error---');
    console.error(status, responseData);
  }
  let errorData = null;
  let errorCode = null;

  // Handle auth failures regardless of whether the body was valid JSON.
  if (status === 401) {
    handleUnauthorized(sentToken);
  } else if (status === 403) {
    History.navigate(UrlEnums.MAIN);
  }

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
  }
  return {
    ok: false,
    errorCode,
    errorMessage,
    errorData,
    online: status != null,
  };
};

const handleResponse = async (response, sentToken) => {
  // A non-JSON body (empty 401, proxy HTML error page, plain-text 404) must not
  // throw before status handling runs.
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }
  if (response.ok) {
    return connectionSuccessResponse(data);
  }
  return connectionErrorResponse(response.status, data, sentToken);
};

export default {
  async post({
    url, params, path = '',
  }) {
    try {
      const sentToken = tokenStore.get();
      const headers = getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const response = await fetch(getUrl(url) + path, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });
      return handleResponse(response, sentToken);
    } catch (error) {
      return connectionErrorResponse(null, null);
    }
  },
  async get({
    url, params, suppressError,
  }) {
    try {
      const sentToken = tokenStore.get();
      const headers = getAuthHeaders();
      const response = await fetch(`${getUrl(url)}${params ? '?' : ''}${encodeQueryData(params)}`, {
        headers,
      });
      return handleResponse(response, sentToken);
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
    return this.post({
      url,
      params,
    });
  },
};
