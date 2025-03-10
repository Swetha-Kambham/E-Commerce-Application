import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: { marginTop: '10%' },
  logo: {
    width: theme.spacing(15),
    margin: 'auto'
  },
  paper: {
    backgroundColor: '#7d94a8',
    maxWidth: theme.spacing(50),
    padding: theme.spacing(4, 4, 2, 4),
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
  header: { marginBottom: theme.spacing(2) },
  or: {
    margin: 'auto',
    color: theme.palette.common.white
  },
  getVerificationCodeButton: {
    textTransform: 'none',
    margin: 'auto',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white
    }
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
  submit: {
    textTransform: 'none',
    margin: 'auto',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white
    }
  },
  phoneNumber: {
    ...theme.typography.body2,
    fontWeight: 600,
    marginLeft: theme.spacing(1)
  },
  otpSection: {
    marginTop: theme.spacing(5)
  },
  accountExistsError: {
    margin: 'auto'
  },
  buttonContainer: {
    marginTop: theme.spacing(4)
  },
  divider: {
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(2),
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  login: {
    ...theme.typography.caption,
    textTransform: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark
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
