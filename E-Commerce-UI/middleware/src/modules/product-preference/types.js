import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    getPageOfPreferencesForUser(
      page: Int!
      pageSize: Int!
      userId: String!
      filter: PreferencesFilter
    ): [ProductPreference]
  }

  extend type Mutation {
    putProductPreference(
      userId: String!
      productId: String!
      skuId: String!
      quantity: Int
      type: PreferenceType!
    ): Boolean
    updatePreferenceQuantity(preferenceId: String!, quantity: Int): Boolean
    deletePreference(preferenceId: String!): Boolean
  }

  input PreferencesFilter {
    type: PreferenceType
  }

  enum PreferenceType {
    CART
    WISHLIST
  }

  type ProductPreference {
    id: String
    type: String
    userId: String
    skuId: String
    productId: String
    productName: String
    productSlug: String
    productCommonName: String
    productDescription: String
    category: ObjectReference
    seller: SellerReference
    currency: Currency
    pricePerUnit: String
    sellingPricePerUnit: String
    quantity: String
  }

  extend type ProductPreference {
    images: [ImageResult]
  }
`;
