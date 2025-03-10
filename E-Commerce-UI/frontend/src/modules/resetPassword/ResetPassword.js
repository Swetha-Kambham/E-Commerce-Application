import React from 'react';
import { useLocation } from 'react-router-dom';
import { FlexView } from 'modules/common/components';
import { CrafthillsLogo } from 'modules/common/components/CrafthillsLogo';
import { IconLinkButton } from 'modules/common/components/IconLinkButton';
import { ResetPasswordContent } from './ResetPasswordContent';
import { getRole, useStyles } from './hooks';

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const ResetPassword = () => {
  const classes = useStyles();
  const { search } = useLocation();
  const query = useQuery({ search });
  const role = getRole(query);

  return (
    <div className={classes.root}>
      <FlexView>
        <IconLinkButton
          className={classes.logo}
          to="/"
          icon={<CrafthillsLogo />}
        />
      </FlexView>
      <ResetPasswordContent role={role} />
    </div>
  );
};
