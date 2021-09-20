import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Container,
} from '@material-ui/core';
import {
  LockOutlined,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import CustomButton from '@/components/inputs/CustomButton';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default function ForgotPassword() {
  const classes = useClasses(styles);

  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: '',
  });

  const [requestLinkSent, setRequestLinkSent] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    email: {
      type: 'isEmail',
      text: 'email.notValid',
    },
  };

  const {
    setCustomError,
    isError,
    getActivateError,
    convertErrorArray,
  } = useError({
    values,
    validations,
  });

  if (requestLinkSent) {
    return (
      <SuccessBox
        text={t('requestLinkSent')}
      />
    );
  }

  const resetPassword = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(
        ApiEndpoints.passwordResetRequest, {
          email: values.email,
        },
      );
      if (res.ok) {
        setRequestLinkSent(true);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({
          email: res.errorMessage,
        });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      resetPassword().then();
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('resetPassword')}
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            name="email"
            id="email"
            label="email.address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            type="email"
            autoFocus
            fullWidth
            required
            error={isError('email')}
          />
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={resetPassword}
          >
            {t('sendVerificationLink')}
          </CustomButton>
        </form>
      </div>
    </Container>
  );
}
