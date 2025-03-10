import { gql } from 'apollo-server';

export const commonTypes = gql`
  input AddressInput {
    name: String
    addressLine1: String
    addressLine2: String
    addressLine3: String
    landmark: String
    city: String
    phoneNumber: PhoneNumberInput
    pinCode: String
    stateId: String
  }

  input DateObject {
    year: Int!
    month: Int!
    day: Int!
  }

  enum Role {
    USER
    SELLER
    ADMIN
  }

  input PhoneNumberInput {
    countryCode: String!
    phoneNumber: String!
  }

  input SettingsValueInput {
    text: String
    uuid: String
    bool: Boolean
    integer: Int
    number: Float
    date: DateObject
  }

  type SettingsValue {
    text: String
    uuid: String
    bool: Boolean
    integer: Int
    number: Float
    date: String
  }

  type PhoneNumber {
    countryCode: String!
    phoneNumber: String!
  }

  type Address {
    id: String
    name: String
    phoneNumber: PhoneNumber
    addressLine1: String
    addressLine2: String
    addressLine3: String
    landmark: String
    city: String
    pinCode: String
    state: State
  }

  input StringInput {
    value: String
  }

  input DateRangeInput {
    startDate: String
    endDate: String
  }

  type DateRange {
    startDate: String
    endDate: String
  }

  input BooleanInput {
    value: String
  }

  input DateInput {
    value: DateObject
  }

  type State {
    id: String
    name: String
  }

  input Money {
    amount: Float
    currencySymbol: String
  }

  type SellerReference {
    id: String
    name: String
    storeName: String
  }

  type ObjectReference {
    id: String
    name: String
  }
`;
