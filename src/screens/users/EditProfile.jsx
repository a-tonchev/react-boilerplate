import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';
import CustomButton from '@/components/inputs/CustomButton';
import CustomTextField from '@/components/inputs/CustomTextField';
import useError from '@/components/validations/hooks/useError';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';

const fullValidations = {
  first: {
    type: 'isName',
    text: 'name.invalid',
  },
  last: {
    type: 'isName',
    text: 'name.invalid',
  },
};

const defaultProfileValues = {
  name: {
    first: '',
    last: '',
  },
  companyName: '',
};

const defaultDisabledValues = {
  email: '',
  clientNumber: '',
};

const EditProfile = () => {
  const [disabledValues, setDisabledValues] = useState(defaultDisabledValues);
  const [profileValues, setProfileValues] = useState(defaultProfileValues);

  const { t } = useTranslation();

  const handleChange = ({ name, value }) => {
    setProfileValues({ ...profileValues, [name]: value });
  };

  const {
    createSuccessSnackbar,
    createErrorSnackbar,
  } = useSnackbar();

  const {
    setCustomError,
    isError,
    getActivateError,
    convertErrorArray,
  } = useError({
    values: profileValues,
    validations: fullValidations,
  });

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading(true);

  useEffect(() => {
    const getOwnProfile = async () => {
      const res = await Connections.postRequest(ApiEndpoints.getOwnProfile);
      if (res.ok) {
        const {
          profile, email, clientNumber,
        } = res.data;
        const {
          name,
          companyName,
        } = profile;
        const newValues = {
          companyName,
          first: name ? name.first : defaultProfileValues.name.first,
          last: name ? name.last : defaultProfileValues.name.last,
        };
        setProfileValues({
          ...defaultProfileValues,
          ...newValues,
        });

        setDisabledValues({
          email,
          clientNumber,
        });
      }
      setLoading(false);
    };

    getOwnProfile().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    first,
    last,
    companyName,
  } = profileValues;

  const {
    email,
    clientNumber,
  } = disabledValues;

  if (loading) return <Loading />;

  const saveProfile = async () => {
    const error = getActivateError();
    if (!error) {
      setLoading(true);
      const res = await Connections.postRequest(ApiEndpoints.updateOwnProfile, {
        profile: {
          name: {
            first,
            last,
          },
          companyName,
        },
      });
      if (res.ok) {
        createSuccessSnackbar(t('Profile Updated Successfully!'));
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors, fullValidations));
      } else {
        createErrorSnackbar(res.errorMessage);
      }
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <CustomTextField
          id="clientNumber"
          name="clientNumber"
          label={t('Customer Number')}
          value={clientNumber}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          id="email"
          name="email"
          label={t('email')}
          value={email}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          id="first"
          fieldName="first"
          label={t('First Name')}
          value={first}
          onChange={handleChange}
          fullWidth
          error={isError('first')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          id="last"
          fieldName="last"
          label={t('Last Name')}
          value={last}
          onChange={handleChange}
          fullWidth
          error={isError('last')}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          id="companyName"
          fieldName="companyName"
          label={t('Company Name')}
          value={companyName}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomButton fullMobile onClick={saveProfile}>{t('Save Profile')}</CustomButton>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
