import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const SELLER_DETAILS = gql`
  query sellerDetails($sellerId: String!) {
    seller(sellerId: $sellerId) {
      id
      name
      storeName
      description
      dateOfBirth
      gstNumber
      enabled
      emailAddress
      phoneNumber {
        countryCode
        phoneNumber
      }
      financialDetails {
        panNumber
        aadharNumber
        bankAccountNumber
        ifscCode
      }
      address {
        addressLine1
        addressLine2
        addressLine3
        landmark
        city
        pinCode
        state {
          id
          name
        }
      }
    }
  }
`;

export const useSellerDetails = ({ sellerId }) => {
  const { loading, data } = useQuery(SELLER_DETAILS, {
    variables: {
      sellerId
    },
    fetchPolicy: 'cache-and-network'
  });

  const seller = get(data, 'seller', {});

  return {
    loading,
    seller
  };
};
