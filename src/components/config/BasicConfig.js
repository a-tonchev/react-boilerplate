const BasicConfig = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  API_VERSION: import.meta.env.VITE_API_VERSION,
  SOFTWARE_VERSION: import.meta.env.VITE_SOFTWARE_VERSION
    ? parseFloat(import.meta.env.VITE_SOFTWARE_VERSION)
    : 0,
  localizations: {
    defaultLanguage: 'de',
    availableLanguages: ['de', 'en'],
  },
};

export default BasicConfig;
