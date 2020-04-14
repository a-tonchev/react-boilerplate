const sortingTypes = [
  {
    name: 'bestMatch',
    translation: 'sorting.bestMatch',
    directions: ['desc'],
  },
  {
    name: 'date',
    translation: 'sorting.date',
    directions: ['asc', 'desc'],
  },
  {
    name: 'price',
    translation: 'sorting.price',
    directions: ['asc', 'desc'],
  },
];

const perPageValues = [
  24,
  48,
];

const viewTypes = [
  {
    name: 'tiles',
    icon: 'view_module',
    translation: 'view.tiles',
  },
  {
    name: 'list',
    icon: 'view_list',
    translation: 'view.list',
  },
];

export { sortingTypes, perPageValues, viewTypes };
export default { sortingTypes };
