import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const getWidth = () => {
  const w = window.innerWidth;
  if (w >= breakpoints.xl) return 'xl';
  if (w >= breakpoints.lg) return 'lg';
  if (w >= breakpoints.md) return 'md';
  if (w >= breakpoints.sm) return 'sm';
  return 'xs';
};

const useWidth = () => {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const handler = () => setWidth(getWidth());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return width;
};

export default useWidth;
