import {
  getAllProducts,
  putProduct,
  getProductDetails,
  putProductOptionAndValues,
  deleteProductOption,
  deleteProductOptionValue,
  getProductOptionAndValues,
  getProductSkus,
  getSignedUrlForProductSKUImages,
  updateProductDescription,
  updateProductTag,
  updateProductLocationTag,
  updateProductBasicDetails,
  putProductSKU,
  deleteProductSKU,
  updateProductSKUPricePerUnit,
  updateProductSKUSellingPricePerUnit,
  updateProductSKUQuantity,
  getPageOfProductUnits,
  getProductUnitDetail,
  updateProductStatus
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Mutation: {
      putProduct: putProduct,
      putProductOptionAndValues: putProductOptionAndValues,
      deleteProductOption: deleteProductOption,
      deleteProductOptionValue: deleteProductOptionValue,
      updateProductBasicDetails: updateProductBasicDetails,
      updateProductDescription: updateProductDescription,
      updateProductTag: updateProductTag,
      updateProductLocationTag: updateProductLocationTag,
      putProductSKU: putProductSKU,
      deleteProductSKU: deleteProductSKU,
      updateProductSKUPricePerUnit: updateProductSKUPricePerUnit,
      updateProductSKUSellingPricePerUnit: updateProductSKUSellingPricePerUnit,
      updateProductSKUQuantity: updateProductSKUQuantity,
      updateProductStatus: updateProductStatus
    },
    Query: {
      products: getAllProducts,
      product: getProductDetails,
      pageOfProductUnits: getPageOfProductUnits,
      productUnitDetail: getProductUnitDetail,
      signedUrlForProductSKUImages: getSignedUrlForProductSKUImages
    },
    Product: {
      productOptionAndValues: getProductOptionAndValues,
      productSkus: getProductSkus
    }
  },
  types: types
};
