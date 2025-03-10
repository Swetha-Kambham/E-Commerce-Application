import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useColumnCapacity } from 'modules/common/hooks';
import PropTypes from 'prop-types';
import { TitlebarGridList } from './TitlebarGridList';
import { usePageOfProductUnits } from './hooks';
import { ProductLoadingSkeleton } from './ProductLoadingSkeleton';
import { NoProducts } from './NoProducts';

const useStyles = makeStyles((theme) => ({
  tableRoot: {
    padding: theme.spacing(2),
    overflowX: 'auto'
  }
}));

export const getFilters = ({ category, textSearch }) => {
  const resultFilters = {};

  if (category) {
    resultFilters.categoryIds = [category];
  }
  if (textSearch) {
    resultFilters.textSearch = textSearch;
  }

  return resultFilters;
};

export const ProductGridView = ({ category, textSearch }) => {
  const tableClasses = useStyles();
  const { capacity } = useColumnCapacity();

  const filters = useMemo(
    () => getFilters({ category, textSearch }),
    [category, textSearch]
  );

  const { productUnits, loading, loadMore, hasMore } = usePageOfProductUnits({
    filters
  });

  if (loading) return <ProductLoadingSkeleton cols={capacity} />;

  if (!productUnits || productUnits.length === 0)
    return <NoProducts filter={Object.keys(filters).length > 0} />;

  return (
    <div className={tableClasses.tableRoot}>
      <InfiniteScroll
        dataLength={productUnits.length}
        next={loadMore}
        hasMore={hasMore}
      >
        <TitlebarGridList cols={capacity} records={productUnits} />
      </InfiniteScroll>
    </div>
  );
};

ProductGridView.propTypes = {
  category: PropTypes.string,
  textSearch: PropTypes.string
};
