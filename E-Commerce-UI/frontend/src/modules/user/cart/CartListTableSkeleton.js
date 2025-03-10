import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  makeStyles,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  leftAlign: {
    textAlign: 'left'
  },
  rightAlign: {
    textAlign: 'right'
  }
}));

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CartListTableSkeleton = () => {
  const classes = useStyles();

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Skeleton height={40} />
          </TableCell>
          <TableCell>
            <Skeleton height={40} />
          </TableCell>
          <TableCell className={classes.rightAlign}>
            <Skeleton height={40} />
          </TableCell>
          <TableCell className={classes.rightAlign}>
            <Skeleton height={40} />
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row}>
            <TableCell>
              <Skeleton height={150} />
            </TableCell>
            <TableCell>
              <Skeleton height={40} />
            </TableCell>
            <TableCell className={classes.rightAlign}>
              <Skeleton height={40} />
            </TableCell>
            <TableCell className={classes.rightAlign}>
              <Skeleton height={40} />
            </TableCell>
            <TableCell width={40}>
              <Skeleton height={40} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
