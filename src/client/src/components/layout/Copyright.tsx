import React from 'react';
import { Typography, Link } from '@material-ui/core';
export const Copyright = ()=> {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Hartog Jacobs'}
      <Link color="inherit" href="https://www.hartogjacobs.com/">
        Hartog Jacobs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}