import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(15),
    height: theme.spacing(40),
    width: '60%',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '70%'
    },
    display: 'flex'
  },
  container: {
    margin: 'auto',
    textAlign: 'center'
  },
  success: {
    background: theme.palette.success.light
  },
  error: {
    background: theme.palette.error.light
  },
  icon: {
    color: theme.palette.common.white,
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  crossIcon: {
    color: theme.palette.common.white,
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  messageLabel: {
    color: theme.palette.common.white
  },
  button: {
    marginTop: theme.spacing(4),
    background: theme.palette.common.white,
    opacity: '90%',
    textTransform: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      opacity: '100%',
      background: theme.palette.common.white
    }
  }
}));
