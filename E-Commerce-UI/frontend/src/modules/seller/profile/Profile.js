import React from 'react';
import { SellerProfile } from 'modules/sellerProfileCommon';
import useAuthContext from 'modules/auth';

export const Profile = () => {
  const { me } = useAuthContext();

  return <SellerProfile editable sellerId={me.id} />;
};

export default Profile;
