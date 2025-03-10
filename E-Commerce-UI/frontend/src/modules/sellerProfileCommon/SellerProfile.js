import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useIsScreenDown } from 'modules/common';
import { useSellerDetails } from './hooks';
import { SellerBasicDetails } from './SellerBasicDetails';
import { SellerAddressDetails } from './SellerAddressDetails';
import { BankingDetails } from './BankingDetails';
import { GSTDetails } from './GSTDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  }
}));

export const SellerProfile = ({ sellerId, editable }) => {
  const classes = useStyles();
  const isMobile = useIsScreenDown('sm');
  const { seller, loading } = useSellerDetails({ sellerId });

  if (loading) return null;

  return (
    <div className={classes.root}>
      <SellerBasicDetails
        isMobile={isMobile}
        seller={seller}
        editable={editable}
      />
      <GSTDetails isMobile={isMobile} seller={seller} editable={editable} />
      <SellerAddressDetails
        isMobile={isMobile}
        seller={seller}
        editable={editable}
      />
      <BankingDetails isMobile={isMobile} seller={seller} editable={editable} />
    </div>
  );
};

SellerProfile.propTypes = {
  sellerId: PropTypes.string,
  editable: PropTypes.bool
};
