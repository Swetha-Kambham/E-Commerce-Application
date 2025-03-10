import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

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

export const ListTableMobileRow = ({ records, MobileRowComponent }) => {
  const tableRowClasses = useStyles();

  return (
    <>
      {records.map((record, index) => (
        <div className={tableRowClasses.row} key={record.id || `row${index}`}>
          <MobileRowComponent
            key={record.id || `row${index}`}
            record={record}
            index={index}
          />
        </div>
      ))}
    </>
  );
};

ListTableMobileRow.propTypes = {
  records: PropTypes.arrayOf(PropTypes.any),
  MobileRowComponent: PropTypes.elementType
};
