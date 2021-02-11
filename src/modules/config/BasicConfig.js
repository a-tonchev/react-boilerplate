const BasicConfig = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
  API_VERSION: process.env.REACT_APP_API_VERSION,
  SOFTWARE_VERSION: process.env.REACT_APP_SOFTWARE_VERSION
    ? parseFloat(process.env.REACT_APP_SOFTWARE_VERSION)
    : 0,
  localizations: {
    defaultLanguage: 'de',
    availableLanguages: ['de', 'en'],
  },
};

export default BasicConfig;
