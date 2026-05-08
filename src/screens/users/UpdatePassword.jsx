import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@/components/inputs/CustomGrid';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import CustomButton from '@/components/inputs/CustomButton';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';

const defaultValues = { currentPassword: '', password: '', repeatPassword: '' };

const UpdatePassword = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(defaultValues);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    currentPassword: { type: 'isPassword', text: 'errorDescription.password' },
    password: { type: 'isPassword', text: 'errorDescription.password' },
    repeatPassword: { customValidation: () => values.password === values.repeatPassword, text: 'password.shouldMatch' },
  };
  const {
    setCustomError, isError, getActivateError, convertErrorArray, deactivateError,
  } = useError({ values, validations });
  const { createSuccessSnackbar } = useSnackbar();

  const updatePassword = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(ApiEndpoints.updatePassword, {
        currentPassword: values.currentPassword, password: values.password,
      });
      if (res.ok) {
        createSuccessSnackbar(t('Password updated successfully!'));
        deactivateError();
        setValues(defaultValues);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({ currentPassword: res.errorMessage });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const handleChange = ({ name, value }) => { setValues({ ...values, [name]: value }); };

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-6">{t('resetPassword')}</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextField
            id="currentPassword"
            name="currentPassword"
            label={t('Current Password')}
            autoComplete="current-password"
            value={values.currentPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('currentPassword')}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="password"
            name="password"
            label={t('New Password')}
            value={values.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('password')}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="repeatPassword"
            name="repeatPassword"
            label={t('Repeat New Password')}
            value={values.repeatPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('repeatPassword')}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="flex justify-end mt-2">
            <CustomButton onClick={updatePassword}>{t('Set New Password')}</CustomButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdatePassword;
