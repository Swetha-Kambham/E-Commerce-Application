import useAuthContext from 'modules/auth';
import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { CartListTableSkeleton } from './CartListTableSkeleton';
import { CartListTable } from './CartListTable';
import { usePageOfPreferencesForUser } from '../hooks';

export const CartListTableContext = () => {
  const { me } = useAuthContext();
  const { preferences, loading } = usePageOfPreferencesForUser({
    userId: me.id
  });

  const initialValues = useMemo(
    () => ({ records: preferences || [] }),
    [preferences]
  );

  if (loading) return <CartListTableSkeleton />;

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      <CartListTable />
    </Formik>
  );
};
