import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    sellers: [Seller]
    seller(sellerId: String!): SellerDetails
    validateStoreName(storeName: String!): Boolean
  }

  extend type Mutation {
    putSeller(id: String, input: SellerInput): Boolean
    updateSellerPassword(sellerId: String!, newPassword: String!): Boolean
    updateSellerAddress(sellerId: String!, address: AddressInput): Boolean
    updateSellerDetails(sellerId: String!, input: SellerInput): Boolean
    putSellerFinancialDetails(
      sellerId: String!
      sellerFinancialDetails: SellerFinancialDetailsInput
    ): Boolean
  }

  input SellerInput {
    name: String
    storeName: String
    dateOfBirth: DateObject
    gstNumber: String
    description: String
    emailAddress: String
    phoneNumber: PhoneNumberInput
    password: String
    address: AddressInput
  }

  input SellerFinancialDetailsInput {
    panNumber: String
    aadharNumber: String
    bankAccountNumber: String
    ifscCode: String
  }

  type SellerDetails {
    id: String!
    name: String
    storeName: String
    dateOfBirth: String
    gstNumber: String
    description: String
    emailAddress: String
    phoneNumber: PhoneNumber
    enabled: Boolean
    address: Address
    financialDetails: FinancialDetails
  }

  type FinancialDetails {
    panNumber: String
    aadharNumber: String
    bankAccountNumber: String
    ifscCode: String
  }

  type Seller {
    id: String!
    name: String
    storeName: String
    emailAddress: String
    phoneNumber: PhoneNumber
    enabled: Boolean
  }
`;
