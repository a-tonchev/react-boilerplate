const BasicConfig = {
  SERVER_PROTOCOL: import.meta.env.VITE_SERVER_PROTOCOL,
  SERVER_HOST: import.meta.env.VITE_SERVER_HOST,
  SERVER_PORT: import.meta.env.VITE_SERVER_PORT,
  SERVER_PATH: import.meta.env.VITE_SERVER_PATH,
  HOST_SAME_URL: import.meta.env.VITE_HOST_SAME_URL === 'true',
  API_VERSION: import.meta.env.VITE_API_VERSION,
  SOFTWARE_VERSION: import.meta.env.VITE_SOFTWARE_VERSION
    ? parseFloat(import.meta.env.VITE_SOFTWARE_VERSION)
    : 0,
  localizations: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'de'],
  },
  /**
   * You can also create an own Collections at unsplash and link the collection
   * here to use random-images use a link to a single image if
   * Image should stay the same on each login
   */
  loginImage: 'url(/img/splash2.jpeg)',
  copyright: {
    url: 'https://myProject.xx',
    text: 'myProject',
  },
};

export default BasicConfig;
