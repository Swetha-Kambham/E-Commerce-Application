import { useMutation, gql } from '@apollo/client';

const DELETE_OBJECTS = gql`
  mutation deleteObjects($objectKeys: [String!]) {
    deleteObjects(objectKeys: $objectKeys)
  }
`;

export const useDeleteObjects = () => {
  const [deleteObjects] = useMutation(DELETE_OBJECTS);

  return {
    deleteObjects: async ({ objectKeys }) => {
      const { data } = await deleteObjects({
        variables: { objectKeys }
      });

      return data?.deleteObjects;
    }
  };
};
