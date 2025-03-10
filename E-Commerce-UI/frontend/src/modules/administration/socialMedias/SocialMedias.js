import React, { useState, useCallback } from 'react';
import { resource } from 'modules/resources';
import { makeStyles, Button } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  BooleanFormatter,
  NameFormatter
} from 'modules/common/components/formatters';
import { NoDataMessage } from 'modules/common/components/NoDataMessage';
import { useSocialMedias } from './hooks';
import { EditSocialMedia } from './EditSocialMedia';

const {
  admin: { socialMedia }
} = resource;

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const useColumnStyles = makeStyles((theme) => ({
  name: {
    '&:hover': { backgroundColor: '#3f51b50a' }
  }
}));

const useStyles = makeStyles((theme) => ({
  addNewButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  noDataContainer: {
    marginLeft: theme.spacing(2)
  }
}));

const useColumns = ({ classes, onRowClick }) => [
  {
    id: 'name',
    label: socialMedia.name,
    renderer: NameFormatter,
    className: classes.name,
    custom: {
      onClick: onRowClick
    }
  },
  { id: 'url', label: socialMedia.url, renderer: StringFormatter },
  { id: 'enabled', label: socialMedia.enabled, renderer: BooleanFormatter }
];

export const SocialMedias = () => {
  const tableClasses = useTableStyles();
  const classes = useStyles();
  const columnClasses = useColumnStyles();
  const { loading, socialMedias } = useSocialMedias();
  const [socialMediaId, setSocialMediaId] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const onRowClick = useCallback((id) => {
    setIsEditDrawerOpen(true);
    setSocialMediaId(id);
  }, []);
  const onAddClick = useCallback(() => {
    setSocialMediaId(null);
    setIsEditDrawerOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsEditDrawerOpen(false);
  }, []);
  const columns = useColumns({ classes: columnClasses, onRowClick, onClose });

  if (loading) return null;

  return (
    <>
      <Button
        className={classes.addNewButton}
        onClick={onAddClick}
        color="primary"
      >
        {socialMedia.addNew}
      </Button>
      {socialMedias && socialMedias.length ? (
        <ListTable
          classes={tableClasses}
          records={socialMedias}
          isLoading={loading}
          columns={columns}
        />
      ) : (
        <div className={classes.noDataContainer}>
          <NoDataMessage message="No Account(s) added." />
        </div>
      )}
      {isEditDrawerOpen ? (
        <EditSocialMedia
          open={isEditDrawerOpen}
          onClose={onClose}
          isAaddMode={!socialMediaId}
          id={socialMediaId}
        />
      ) : null}
    </>
  );
};
