import React from 'react';
import { TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    borderRight: '1px solid #e0e0e0'
  },
  row: {
    '& th:last-child': {
      borderRight: 'none'
    }
  }
}));

export const ListTableHeader = ({ columns, classes }) => {
  const headerClasses = useStyles();

  return (
    <TableHead>
      <TableRow className={headerClasses.row}>
        {columns.map((c) => (
          <TableCell
            align={c.align}
            className={clsx(
              headerClasses.cell,
              classes && classes.headerCell,
              c.className
            )}
            key={c.id}
          >
            {c.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

ListTableHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any)
};

export default ListTableHeader;
