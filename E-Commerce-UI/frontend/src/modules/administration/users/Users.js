import React from 'react';
import { resource } from 'modules/resources';
import { makeStyles } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  BooleanFormatter
} from 'modules/common/components/formatters';
import { useUsers } from './useUsers';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const {
  admin: { user }
} = resource;

const columns = [
  { id: 'name', label: user.name, renderer: StringFormatter },
  {
    id: 'emailAddress',
    label: user.emailAddress,
    renderer: StringFormatter
  },
  { id: 'enabled', label: user.enabled, renderer: BooleanFormatter }
];

export const Users = () => {
  const tableClasses = useTableStyles();
  const { loading, users } = useUsers();

  if (loading) return null;

  if (users.length === 0) return <div>No Data</div>;

  return (
    <ListTable
      classes={tableClasses}
      records={users}
      isLoading={loading}
      columns={columns}
    />
  );
};
