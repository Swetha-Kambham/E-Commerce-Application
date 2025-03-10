import React from 'react';
import { HeaderComponent, FooterComponent } from 'modules/common';
import { HomeContent } from './HomeContent';

export const Home = () => {
  return (
    <>
      <HeaderComponent />
      <HomeContent />
      <FooterComponent />
    </>
  );
};

Home.propTypes = {};

export default Home;
