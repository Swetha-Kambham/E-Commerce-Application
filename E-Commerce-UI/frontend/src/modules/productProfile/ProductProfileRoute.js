import React from 'react';
import {
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams
} from 'react-router-dom';
import { ProductProfilePage } from './ProductProfilePage';
import { useProductUnitDetail } from './hooks';
import { ProductProfilePageSkeleton } from './ProductProfilePageSkeleton';

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const ProductProfileRoute = () => {
  const { search } = useLocation();
  const { slug } = useParams();
  const query = useQuery({ search });
  const sku = query.get('sku');
  const { productUnit, loading } = useProductUnitDetail({
    sku,
    productSlug: slug
  });

  const match = useRouteMatch({
    path: `/product/${productUnit.slug}`,
    strict: true,
    sensitive: true
  });

  if (loading) return <ProductProfilePageSkeleton />;

  return (
    <Switch>
      <Route exact path={`${match?.path}/`}>
        {productUnit && productUnit.skuId && productUnit.productId ? (
          <ProductProfilePage productUnit={productUnit} />
        ) : (
          <Redirect to="/page-not-found" />
        )}
      </Route>
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};
