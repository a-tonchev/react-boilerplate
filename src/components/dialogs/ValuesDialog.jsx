import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@/components/inputs/CustomGrid';
import useValues from '@/components/dataHandling/hooks/useValues';
import CustomButton from '@/components/inputs/CustomButton';
import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextField from '@/components/inputs/CustomTextField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const ValuesDialog = ({
  title,
  text,
  open,
  defaultValues,
  inputs = [],
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const { values, handleChange, resetValues } = useValues({ defaultValues });

  useEffect(() => {
    resetValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={isOpen => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{text}</p>
        <Grid container>
          {inputs.map((inputData, index) => {
            const {
              inputType, props, gridProps = { xs: 12 }, key = `values_dialog_input_${index}`,
            } = inputData;
            const { name } = props;

            return (
              <Grid item {...gridProps} key={key}>
                {inputType === 'text' && (
                  <CustomTextField
                    fullWidth
                    onChange={handleChange}
                    {...props}
                    value={values[name]}
                  />
                )}
                {inputType === 'select' && (
                  <CustomSelect
                    fullWidth
                    onChange={handleChange}
                    {...props}
                    value={values[name]}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
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
              onSave(values);
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
export default ValuesDialog;
