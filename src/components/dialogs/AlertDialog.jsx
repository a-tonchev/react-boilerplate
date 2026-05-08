import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/inputs/CustomButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const AlertDialog = ({
  title,
  text,
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{text}</p>
        <DialogFooter>
          <CustomButton
            onClick={() => onClose()}
            className="w-full"
          >
            {t('ok')}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AlertDialog;
