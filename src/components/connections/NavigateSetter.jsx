import { useNavigate } from 'react-router-dom';

import History from '@/components/connections/History';

const NavigateSetter = () => {
  History.navigate = useNavigate();

  return null;
};

export default NavigateSetter;
