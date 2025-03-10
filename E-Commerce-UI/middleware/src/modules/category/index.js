import {
  getAllCategories,
  putCategory,
  getCategory,
  deleteCategory
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      categories: getAllCategories,
      category: getCategory
    },
    Mutation: {
      putCategory: putCategory,
      deleteCategory: deleteCategory
    }
  },
  types: types
};
