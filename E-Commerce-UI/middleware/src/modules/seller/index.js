import {
  getAllSellers,
  putSeller,
  updateSellerAddress,
  getSellerById,
  updateSellerDetails,
  putSellerFinancialDetails,
  validateStoreName,
  updatePassword
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      sellers: getAllSellers,
      seller: getSellerById,
      validateStoreName: validateStoreName
    },
    Mutation: {
      putSeller: putSeller,
      updateSellerPassword: updatePassword,
      updateSellerAddress: updateSellerAddress,
      updateSellerDetails: updateSellerDetails,
      putSellerFinancialDetails: putSellerFinancialDetails
    }
  },
  types: types
};
