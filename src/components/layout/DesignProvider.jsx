import SuccessSnackBar from '@/components/dialogs/snackbars/SuccessSnackBar';
import ErrorSnackBar from '@/components/dialogs/snackbars/ErrorSnackBar';
import VersionDetector from '@/screens/update/VersionDetector';

import BasicLayout from './BasicLayout';

const DesignProvider = ({ children }) => (
  <>
    <BasicLayout>
      {children}
    </BasicLayout>
    <SuccessSnackBar />
    <ErrorSnackBar />
    <VersionDetector />
  </>
);

export default DesignProvider;
