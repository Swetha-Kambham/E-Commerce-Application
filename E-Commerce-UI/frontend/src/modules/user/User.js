import React from 'react';
import { HeaderComponent, FooterComponent } from 'modules/common';
import { UserHome } from './UserHome';

export const User = () => {
  return (
    <>
      <HeaderComponent />
      <UserHome />
      <FooterComponent />
    </>
  );
};

User.propTypes = {};

export default User;
