import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/inputs/CustomButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const ConfirmDialog = ({
  title,
  text,
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{text}</p>
        <DialogFooter className="gap-2">
          <CustomButton
            onClick={() => {
              onClose(true);
              onConfirm();
            }}
            className="w-full"
          >
            {t('yes')}
          </CustomButton>
          <CustomButton
            onClick={() => onClose()}
            variant="outlined"
            className="w-full"
          >
            {t('no')}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDialog;
