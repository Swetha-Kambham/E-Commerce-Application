import {
  getAllStates,
  validatePhoneNumber,
  validateEmailAddress,
  getBaseCurrency
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      states: getAllStates,
      validatePhoneNumber: validatePhoneNumber,
      validateEmailAddress: validateEmailAddress,
      baseCurrency: getBaseCurrency
    }
  },
  types: types
};
