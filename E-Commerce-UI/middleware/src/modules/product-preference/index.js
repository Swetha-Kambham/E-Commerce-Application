import {
  getPageOfPreferencesForUser,
  putProductPreference,
  updatePreferenceQuantity,
  deletePreference,
  getImagesForProductPreference
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Mutation: {
      putProductPreference: putProductPreference,
      updatePreferenceQuantity: updatePreferenceQuantity,
      deletePreference: deletePreference
    },
    Query: { getPageOfPreferencesForUser: getPageOfPreferencesForUser },
    ProductPreference: {
      images: getImagesForProductPreference
    }
  },
  types: types
};
