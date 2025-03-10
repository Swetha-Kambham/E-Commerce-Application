import React from 'react';
import {
  TableRow,
  TableCell,
  makeStyles,
  TableFooter
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    borderRight: '1px solid #e0e0e0'
  },
  row: {
    '& tfoot:last-child': {
      borderRight: 'none'
    }
  }
}));

export const ListTableFooter = ({ columns, classes, totals }) => {
  const footerClasses = useStyles();

  return (
    <TableFooter>
      <TableRow className={footerClasses.row}>
        {columns.map((c) => (
          <TableCell
            align={c.align}
            className={clsx(
              footerClasses.cell,
              classes.footerCell,
              c.footerClassName
            )}
            key={c.id}
          >
            {c.footerRendered ? (
              <c.footerRendered record={totals} field={c.id} />
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableFooter>
  );
};

ListTableFooter.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  totals: PropTypes.any
};

export default ListTableFooter;
