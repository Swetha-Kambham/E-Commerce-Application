import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: { marginTop: '10%' },
  logo: {
    width: theme.spacing(15),
    margin: 'auto'
  },
  signupContainer: {
    marginTop: theme.spacing(2)
  },
  paper: {
    backgroundColor: '#7d94a8',
    maxWidth: theme.spacing(50),
    padding: theme.spacing(8, 4, 8, 4),
    margin: 'auto',
    [theme.breakpoints.between('400', 'sm')]: {
      maxWidth: theme.spacing(45),
      padding: theme.spacing(2)
    },
    [theme.breakpoints.down('400')]: {
      maxWidth: '100%',
      margin: theme.spacing(2)
    }
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  checkbox: {
    marginTop: theme.spacing(-1.5)
  },
  forgotPasswordButton: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    paddingTop: 'unset',
    paddingBottom: 'unset',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark
    }
  },
  forgotPasswordLabel: {
    textTransform: 'none',
    [theme.breakpoints.down('400')]: {
      fontSize: '0.7rem'
    }
  },
  rememberMe: {
    [theme.breakpoints.down('400')]: {
      fontSize: '0.7rem'
    }
  },
  signup: {
    marginBottom: 'auto',
    paddingTop: 'unset',
    paddingBottom: 'unset',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark
    }
  },
  signupLabel: { textTransform: 'none' },
  signInButton: {
    marginLeft: 'auto',
    marginTop: theme.spacing(-1),
    textTransform: 'none',
    borderRadius: theme.spacing(2),
    width: theme.spacing(15),
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white
    }
  },
  loadingContainer: {
    display: 'grid',
    width: '100%',
    marginTop: theme.spacing(2)
  },
  loading: {
    margin: 'auto',
    transitionDelay: '800ms'
  },
  loadingLabel: {
    textAlign: 'center',
    paddingLeft: theme.spacing(1.5)
  },
  error: {
    color: '#ffa39b !important'
  }
}));
