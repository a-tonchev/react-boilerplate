import { useState } from 'react';

import Loading from '../Loading';

const useLoading = (defaultLoading = false) => {
  const [loading, setLoading] = useState(defaultLoading);
  return {
    loading,
    Loading,
    setLoading,
  };
};

export default useLoading;
