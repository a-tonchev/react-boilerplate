const History = {
  navigate: null,
  push: (page, ...rest) => History.navigate(page, ...rest),
};

export default History;