import React from 'react';
import { TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    borderRight: '1px solid #e0e0e0'
  },
  row: {
    '& td:last-child': {
      borderRight: 'none'
    }
  }
}));

export const ListTableRow = ({ records, columns, classes }) => {
  const tableRowClasses = useStyles();

  return (
    <TableBody>
      {records.map((record, index) => (
        <TableRow
          className={tableRowClasses.row}
          key={record.id || `row${index}`}
        >
          {columns.map((c) => (
            <TableCell
              align={c.align}
              className={clsx(
                tableRowClasses.cell,
                classes && classes.tableCell,
                c.className
              )}
              key={c.id}
            >
              <c.renderer
                record={record}
                index={index}
                field={c.id}
                column={c.custom || {}}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

ListTableRow.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  records: PropTypes.arrayOf(PropTypes.any)
};
