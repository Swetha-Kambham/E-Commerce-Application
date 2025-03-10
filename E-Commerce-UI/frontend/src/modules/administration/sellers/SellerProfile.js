import React from 'react';
import { useParams } from 'react-router-dom';
import { SellerProfile as SellerProfileCommon } from 'modules/sellerProfileCommon';

export const SellerProfile = () => {
  const { sellerId } = useParams();

  return <SellerProfileCommon editable={false} sellerId={sellerId} />;
};
