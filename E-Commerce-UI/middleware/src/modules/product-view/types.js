import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    getPageOfProductView(
      page: Int!
      pageSize: Int!
      filters: ProductViewFilter
    ): [ProductView]
    getPageOfProductView2(
      page: Int!
      pageSize: Int!
      viewId: String!
      filters: ProductViewFilter
    ): [ProductUnit]
    getProductView(id: String): ProductView
    signedUrlForProductViewImagesUpload(
      id: String!
      images: [SignedUrlForUploadImageInput]!
    ): [SignedUrl]
  }

  extend type Mutation {
    putProductView(productView: ProductViewInput): ProductView
    updateProductView(id: String, productView: ProductViewInput): Boolean
    deleteProductView(id: String!, name: String!): Boolean
    addOrUpdateProductUnitsToProductView(
      id: String
      productUnits: [ProductUnitInput]
    ): Boolean
  }

  input ProductUnitInput {
    productId: String!
    skuId: String!
    slug: String
    sku: String
  }

  input ProductViewFilter {
    isEnabled: Boolean
    priorityStartRange: Int
    priorityEndRange: Int
    hasProductUnits: Boolean
  }

  input ProductViewInput {
    name: String!
    description: String
    summary: String
    priority: Int!
    enabled: Boolean
  }

  type ProductView {
    id: String
    name: String
    description: String
    summary: String
    priority: Int
    enabled: Boolean
    productUnits: [ProductUnitReference]
    images: [ImageResult]
  }
`;
