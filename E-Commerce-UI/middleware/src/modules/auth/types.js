import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    me: Me
    requestVerificationCode(
      role: Role!
      id: String
      phoneNumber: PhoneNumberInput
      emailAddress: String
    ): VerificationReference
    verifyVerificationCode(
      role: Role!
      phoneNumber: PhoneNumberInput
      emailAddress: String
      serviceSId: String
      verificationCode: String
      channel: String
    ): LoginResult
    initPhoneVerification(phoneNumber: PhoneNumberInput!): VerificationReference
    completePhoneVerification(
      phoneNumber: PhoneNumberInput!
      serviceSId: String!
      verificationCode: String!
    ): CompletePhoneVerificationResult
  }

  extend type Mutation {
    logout(input: LogoutInput): Boolean
    login(input: LoginInput): LoginResult
  }

  type Me {
    id: String!
    name: String!
    phoneNumber: PhoneNumber
    emailAddress: String
    role: Role!
  }

  input LogoutInput {
    sessionId: String
  }

  input LoginInput {
    emailAddress: String
    phoneNumber: PhoneNumberInput
    loginName: String
    password: String!
  }

  type LoginResult {
    id: String!
    loginName: String
    role: Role
    jwt: String
    status: Int!
  }

  input CompletePhoneVerificationInput {
    phoneNumber: PhoneNumberInput
    serviceSId: String
    verificationCode: String
  }

  type CompletePhoneVerificationResult {
    status: String
  }

  type VerificationReference {
    phoneNumber: PhoneNumber
    serviceSId: String
    channel: String
  }
`;
