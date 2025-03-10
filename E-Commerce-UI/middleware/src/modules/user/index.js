import {
  getUserById,
  getAllUsers,
  putUser,
  updatePassword,
  getUserAddresses,
  putAddress,
  deleteAddress
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      user: getUserById,
      users: getAllUsers
    },
    Mutation: {
      putUser: putUser,
      updateUserPassword: updatePassword,
      putAddress: putAddress,
      deleteAddress: deleteAddress
    },
    User: {
      addresses: getUserAddresses
    }
  },
  types: types
};
