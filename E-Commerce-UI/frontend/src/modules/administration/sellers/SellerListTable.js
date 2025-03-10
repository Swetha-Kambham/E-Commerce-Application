import React, { useCallback } from 'react';
import { resource } from 'modules/resources';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  NameFormatter,
  BooleanFormatter
} from 'modules/common/components/formatters';
import { useSellers } from './useSellers';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const {
  admin: { seller }
} = resource;

const useColumns = ({ onRowClick }) => [
  {
    id: 'name',
    label: seller.name,
    renderer: NameFormatter,
    custom: { onClick: onRowClick }
  },
  { id: 'storeName', label: seller.storeName, renderer: StringFormatter },
  {
    id: 'emailAddress',
    label: seller.emailAddress,
    renderer: StringFormatter
  },
  { id: 'enabled', label: seller.enabled, renderer: BooleanFormatter }
];

export const SellerListTable = ({ path }) => {
  const tableClasses = useTableStyles();
  const history = useHistory();
  const { loading, sellers } = useSellers();

  const onRowClick = useCallback(
    (id) => {
      history.push(`${path}/${id}/view`);
    },
    [history, path]
  );

  const columns = useColumns({ onRowClick });

  if (loading) return null;

  if (sellers.length === 0) return <div>No Data</div>;

  return (
    <ListTable
      classes={tableClasses}
      records={sellers}
      isLoading={loading}
      columns={columns}
    />
  );
};

SellerListTable.propTypes = {
  path: PropTypes.string
};
