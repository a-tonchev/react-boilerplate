import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/inputs/CustomButton';
import CustomTextField from '@/components/inputs/CustomTextField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const InputDialog = ({
  title,
  text,
  open,
  name,
  label = '',
  type = 'text',
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{text}</p>
        <CustomTextField
          autoFocus
          label={label}
          id="input-value"
          type={type}
          fullWidth
          value={value}
          onChange={({ value: newValue }) => setValue(newValue)}
        />
        <DialogFooter className="gap-2">
          <CustomButton
            onClick={() => onClose()}
            className="w-full"
          >
            {t('cancel')}
          </CustomButton>
          <CustomButton
            variant="outlined"
            onClick={() => {
              onClose();
              onSave({ name, value });
              setValue('');
            }}
            buttonTheme="green"
            className="w-full"
          >
            {t('save')}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default InputDialog;
