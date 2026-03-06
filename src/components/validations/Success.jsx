import { CheckCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

const Success = ({ children }) => (
  <div className="flex justify-center items-center">
    <Alert variant="success" className="flex flex-col items-center text-center bg-white mt-10 mb-10 max-w-md">
      <CheckCircle className="h-24 w-24 mb-4" />
      <AlertDescription className="text-base">
        {children}
      </AlertDescription>
    </Alert>
  </div>
);

export default Success;
