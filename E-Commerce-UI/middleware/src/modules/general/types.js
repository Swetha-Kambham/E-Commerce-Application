import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    states: [State]
    validatePhoneNumber(phoneNumber: PhoneNumberInput!, role: Role!): Boolean
    validateEmailAddress(emailAddress: String!, role: Role!): Boolean
    baseCurrency: Currency
  }

  type Currency {
    id: String!
    name: String
    symbol: String
    code: String
  }
`;
