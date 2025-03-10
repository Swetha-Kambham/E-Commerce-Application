import {
  getPageOfProductView,
  getProductView,
  putProductView,
  updateProductView,
  deleteProductView,
  getViewProducts,
  getSignedUrlForProductViewImagesUpload,
  addOrUpdateProductUnitsToProductView
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      getPageOfProductView: getPageOfProductView,
      getPageOfProductView2: getViewProducts,
      getProductView: getProductView,
      signedUrlForProductViewImagesUpload:
        getSignedUrlForProductViewImagesUpload
    },
    Mutation: {
      putProductView: putProductView,
      updateProductView: updateProductView,
      deleteProductView: deleteProductView,
      addOrUpdateProductUnitsToProductView: addOrUpdateProductUnitsToProductView
    }
  },
  types: types
};
