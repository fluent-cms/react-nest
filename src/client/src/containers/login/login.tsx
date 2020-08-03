import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Avatar, makeStyles, CircularProgress, Container, CssBaseline, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../core/auth/authSelector';
import { Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { SigninRequest } from 'core/auth/authActions';
import { myDispatch } from 'core/utilities/myDispatch';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const result = useSelector(selectUser)

  const onSubmit = (data: any) => {
    const action =  new SigninRequest(data)
    myDispatch(dispatch,action)
  }
  return !result.user ? <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      {result.loading && <CircularProgress size={68} />}
      {result.err && <Alert severity="error">{result.err}</Alert>}
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Fragment>
          <TextField variant="outlined" margin="normal" required fullWidth id="username"
            label="Email Address" name="username" autoComplete="email" autoFocus inputRef={register} />
          <TextField variant="outlined" margin="normal" required fullWidth name="password"
            label="Password" type="password" id="password" autoComplete="current-password" inputRef={register}
          />
        </Fragment>
       <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
        > Sign In </Button>
      </form>
    </div>
  </Container>
    : <Redirect to={{ pathname: '/dashboard' }} />
}
