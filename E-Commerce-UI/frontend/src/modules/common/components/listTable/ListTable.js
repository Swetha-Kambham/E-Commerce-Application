import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListTableHeader } from './ListTableHeader';
import { ListTableRow } from './ListTableRow';
import { ListTableSkeleton } from './ListTableSkeleton';
import { ListTableFooter } from './ListTableFooter';
import { ListTableMobileRow } from './ListTableMobileRow';

const useStyles = makeStyles((theme) => ({
  tableRoot: {
    padding: theme.spacing(2),
    overflowX: 'auto'
  },
  infiniteScroll: {
    overflow: 'inherit !important'
  }
}));

export const ListTable = ({
  columns,
  records,
  isLoading,
  hasMore,
  next,
  loader,
  endMessage,
  totals,
  classes,
  MobileRowComponent,
  MobileTotalComponent,
  isMobile
}) => {
  const tableClasses = useStyles();

  const Component = useMemo(() => (isMobile ? 'div' : Table), [isMobile]);

  if (isLoading) return <ListTableSkeleton />;

  if (records.length === 0) return null;

  return (
    <div className={tableClasses.tableRoot}>
      <InfiniteScroll
        dataLength={records.length}
        next={next}
        hasMore={hasMore}
        className={tableClasses.infiniteScroll}
        loader={loader}
        endMessage={endMessage}
      >
        <Component className={classes.table}>
          {!isMobile ? (
            <ListTableHeader columns={columns} classes={classes} />
          ) : null}
          {!isMobile ? (
            <ListTableRow
              records={records}
              columns={columns}
              classes={classes}
            />
          ) : null}
          {isMobile && Boolean(MobileRowComponent) ? (
            <ListTableMobileRow
              records={records}
              MobileRowComponent={MobileRowComponent}
            />
          ) : null}
          {!isMobile && totals ? (
            <ListTableFooter
              columns={columns}
              totals={totals}
              classes={classes}
            />
          ) : null}
          {isMobile && Boolean(MobileTotalComponent) ? (
            <MobileTotalComponent totals={totals} />
          ) : null}
        </Component>
      </InfiniteScroll>
    </div>
  );
};

ListTable.propTypes = {
  records: PropTypes.arrayOf(PropTypes.any),
  columns: PropTypes.arrayOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  hasMore: PropTypes.bool,
  next: PropTypes.func,
  loader: PropTypes.node,
  endMessage: PropTypes.node,
  totals: PropTypes.object,
  MobileRowComponent: PropTypes.elementType,
  MobileTotalComponent: PropTypes.elementType,
  isMobile: PropTypes.bool
};
