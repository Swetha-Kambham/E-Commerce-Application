import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_VIEW_SETTINGS = gql`
  mutation deleteViewSettings($name: String) {
    deleteViewSettings(name: $name)
  }
`;

export const useDeleteProductViewSettings = () => {
  const [deleteViewSettings] = useMutation(DELETE_PRODUCT_VIEW_SETTINGS);

  return {
    deleteViewSettings: async ({ name }) => {
      const { data } = await deleteViewSettings({
        variables: { name }
      });

      return data;
    }
  };
};
