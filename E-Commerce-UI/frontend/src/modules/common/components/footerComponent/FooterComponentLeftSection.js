import React, { useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { AiFillTwitterCircle } from 'react-icons/ai';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { useSocialMedias } from './useSocialMedias';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    padding: theme.spacing(2)
  },
  heading: {
    color: '#ffffff'
  },
  subtitle: {
    color: '#ffffff'
  },
  tiSocialGooglePlus: {
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },
  aiFillTwitterCircle: {
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },
  instagram: {
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },
  facebookIcon: {
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },
  contactUsContainer: {
    marginTop: theme.spacing(2)
  },
  contactContainer: {
    display: 'flex',
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginLeft: theme.spacing(-2)
    }
  }
}));

const accountIds = {
  facebook: 'bb4bfa74-9497-4c12-8f40-bba627a1f8eb',
  google: '54b541a8-f88b-4fba-9519-a52a930a296c',
  twitter: 'd951daf6-e137-43b2-ac4b-89a42f725b25',
  instagram: '8b950182-a786-4cb1-9855-b823e7c707f6'
};

export const FooterComponentLeftSection = () => {
  const classes = useStyles();

  const { socialMedias } = useSocialMedias();

  const accounts = useMemo(
    () =>
      (socialMedias || []).reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: curr.url
        }),
        {}
      ),
    [socialMedias]
  );

  const onSocialMediaIconClick = useCallback(
    (id) => () => {
      window.open(accounts[id], '_blank');
    },
    [accounts]
  );

  return (
    <div className={classes.root}>
      <div className={classes.headingContainer}>
        <Typography variant="subtitle2" className={classes.heading}>
          Original Indian Handmade Crafts & Eatables
        </Typography>
      </div>
      <div className={classes.contactUsContainer}>
        <Typography variant="caption" className={classes.subtitle}>
          Contact us :
        </Typography>
      </div>
      <div className={classes.contactContainer}>
        <IconButton onClick={onSocialMediaIconClick(accountIds.google)}>
          <TiSocialGooglePlus className={classes.tiSocialGooglePlus} />
        </IconButton>
        <IconButton onClick={onSocialMediaIconClick(accountIds.twitter)}>
          <AiFillTwitterCircle className={classes.aiFillTwitterCircle} />
        </IconButton>
        <IconButton onClick={onSocialMediaIconClick(accountIds.instagram)}>
          <InstagramIcon className={classes.instagram} />
        </IconButton>
        <IconButton onClick={onSocialMediaIconClick(accountIds.facebook)}>
          <FacebookIcon className={classes.facebookIcon} />
        </IconButton>
      </div>
    </div>
  );
};
