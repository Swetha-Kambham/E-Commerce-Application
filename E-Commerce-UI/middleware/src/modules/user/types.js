import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    user(id: String!): User
    users: [User]
  }

  extend type Mutation {
    putUser(id: String, input: UserInput): Boolean
    updateUserPassword(userId: String!, newPassword: String!): Boolean
    putAddress(
      userId: String!
      addressId: String
      address: AddressInput!
    ): Boolean
    deleteAddress(userId: String!, addressId: String!): Boolean
  }

  input ResetPasswordInput {
    serviceSId: String
    verificationCode: String
    phoneNumber: PhoneNumberInput
  }

  input UserInput {
    name: String
    emailAddress: String
    phoneNumber: PhoneNumberInput
    password: String
  }

  type User {
    id: String!
    name: String
    emailAddress: String
    phoneNumber: PhoneNumber
    enabled: Boolean
  }

  extend type User {
    addresses: [Address]
  }
`;
