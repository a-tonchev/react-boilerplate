import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import CustomLink from '../../components/common/customInputs/CustomLink';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const HeaderLogo = () => {
  const classes = useStyles();
  return (
    <CustomLink plain to="/">
      <Typography className={classes.title} variant="h6" noWrap>
        My React APP
      </Typography>
    </CustomLink>
  );
};

export default HeaderLogo;
