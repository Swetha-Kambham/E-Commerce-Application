import { useMutation, gql } from '@apollo/client';

const ADD_OR_UPDATE_PRODUCT_UNITS_TO_PRODUCT_VIEW = gql`
  mutation addOrUpdateProductUnitsToProductView(
    $id: String
    $productUnits: [ProductUnitInput]
  ) {
    addOrUpdateProductUnitsToProductView(id: $id, productUnits: $productUnits)
  }
`;

export const useAddOrUpdateProductUnitsToProductView = () => {
  const [addOrUpdateProductUnitsToProductView] = useMutation(
    ADD_OR_UPDATE_PRODUCT_UNITS_TO_PRODUCT_VIEW
  );

  return {
    addOrUpdateProductUnitsToProductView: async ({ id, productUnits }) => {
      const { data } = await addOrUpdateProductUnitsToProductView({
        variables: { id, productUnits },
        refetchQueries: ['getProductView']
      });

      return data;
    }
  };
};
