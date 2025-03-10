import {
  getAllSocialMediaAccounts,
  getSocialMediaAccount,
  putSocialMediaAccount,
  deleteSocialMediaAccount
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      socialMedias: getAllSocialMediaAccounts,
      socialMedia: getSocialMediaAccount
    },
    Mutation: {
      putSocialMediaAccount: putSocialMediaAccount,
      deleteSocialMediaAccount: deleteSocialMediaAccount
    }
  },
  types: types
};
