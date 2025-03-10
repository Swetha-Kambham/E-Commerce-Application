import { useMutation, gql } from '@apollo/client';

const MARK_ORDER_AS_PENDING = gql`
  mutation markOrderAsPending($draftId: String!) {
    markOrderAsPending(draftId: $draftId)
  }
`;

export const useMarkOrderAsPending = () => {
  const [markOrderAsPending] = useMutation(MARK_ORDER_AS_PENDING);

  return {
    markOrderAsPending: async ({ draftId }) => {
      const { data } = await markOrderAsPending({
        variables: {
          draftId
        }
      });

      return data?.markOrderAsPending;
    }
  };
};
