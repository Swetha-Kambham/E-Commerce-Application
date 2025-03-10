import {
  putViewSettings,
  deleteViewSettings,
  getViewSettings
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      viewSettings: getViewSettings
    },
    Mutation: {
      putViewSettings: putViewSettings,
      deleteViewSettings: deleteViewSettings
    }
  },
  types: types
};
