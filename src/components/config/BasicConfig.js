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
  /**
   * You can also create an own Collections at unsplash and link the collection
   * here to use random-images use a link to a single image if
   * Image should stay the same on each login
   */
  loginImage: 'url(https://source.unsplash.com/random/1600x900/?wallpaper)',
  copyright: {
    url: 'https://myProject.xx',
    text: 'myProject',
  },
};

export default BasicConfig;
