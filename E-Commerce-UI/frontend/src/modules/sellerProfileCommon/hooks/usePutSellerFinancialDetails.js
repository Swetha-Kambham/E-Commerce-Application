import { useMutation, gql } from '@apollo/client';

const PUT_SELLER_FINANCIAL_DETAILS = gql`
  mutation putSellerFinancialDetails(
    $sellerId: String!
    $sellerFinancialDetails: SellerFinancialDetailsInput
  ) {
    putSellerFinancialDetails(
      sellerId: $sellerId
      sellerFinancialDetails: $sellerFinancialDetails
    )
  }
`;

export const usePutSellerFinancialDetails = () => {
  const [putSellerFinancialDetails] = useMutation(PUT_SELLER_FINANCIAL_DETAILS);

  return {
    putSellerFinancialDetails: async ({ sellerId, sellerFinancialDetails }) => {
      const res = await putSellerFinancialDetails({
        variables: { sellerId, sellerFinancialDetails },
        refetchQueries: ['sellerDetails']
      });

      return res;
    }
  };
};
