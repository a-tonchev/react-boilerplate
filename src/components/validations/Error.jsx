import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

const Error = ({ children }) => (
  <div className="flex justify-center items-center">
    <Alert variant="destructive" className="flex flex-col items-center text-center bg-white mt-10 mb-10 max-w-md">
      <AlertCircle className="h-24 w-24 mb-4" />
      <AlertDescription className="text-base">
        {children}
      </AlertDescription>
    </Alert>
  </div>
);

export default Error;
