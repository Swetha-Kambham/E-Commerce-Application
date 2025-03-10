import { makeStyles } from '@material-ui/core';

export const useOTPDialogContentStyles = makeStyles((theme) => ({
  root: { marginTop: '5%' },
  logo: {
    width: theme.spacing(15),
    margin: 'auto'
  },
  phoneNumber: {
    ...theme.typography.body2,
    fontWeight: 600,
    marginLeft: theme.spacing(1)
  },
  verify: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2)
  },
  resend: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    textTransform: 'none',
    opacity: '80%',
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: '100%'
    }
  },
  resendCodeMessage: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  change: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    textTransform: 'none',
    opacity: '80%',
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: '100%'
    }
  },
  changeMessage: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  changeContainer: {
    marginBottom: theme.spacing(2)
  },
  purple: {
    color: 'purple'
  },
  green: {
    color: 'green'
  },
  blue: {
    color: 'blue'
  },
  verificationCodeInputRoot: {
    borderRadius: theme.spacing(2),
    overflow: 'unset'
  }
}));

export const useRegistrationContentStyles = makeStyles((theme) => ({
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
  loginButton: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    textTransform: 'none',
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark
    }
  },
  signInMessage: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  createAccountButton: {
    textTransform: 'none',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
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
  }
}));
