/* eslint-disable camelcase */
import {
  initPhoneVerification,
  completePhoneVerification,
  logout,
  getMe,
  login,
  requestVerificationCode,
  verifyVerificationCode
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      me: getMe,
      requestVerificationCode: requestVerificationCode,
      initPhoneVerification: initPhoneVerification,
      completePhoneVerification: completePhoneVerification,
      verifyVerificationCode: verifyVerificationCode
    },
    Mutation: {
      logout: logout,
      login: login
    }
  },
  types: types
};
