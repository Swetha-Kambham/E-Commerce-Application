import { gql } from 'apollo-server';
import { merge } from 'lodash';
import user from './user';
import socialMedia from './social-media';
import category from './category';
import seller from './seller';
import product from './product';
import order from './order';
import auth from './auth';
import cloudOperations from './cloud-upload';
import general from './general';
import productView from './product-view';
import viewSettings from './view-settings';
import productPreference from './product-preference';
import { commonTypes } from './commonTypes';

export const query = gql`
  type Query {
    graphql: String
  }
  type Mutation {
    graphql: String
  }
`;

const { types: userTypes, resolvers: userResolvers } = user;
const { types: socialMediaTypes, resolvers: socialMediaResolvers } =
  socialMedia;
const { types: categoryTypes, resolvers: categoryResolvers } = category;
const { types: sellerTypes, resolvers: sellerResolvers } = seller;
const { types: productTypes, resolvers: productResolvers } = product;
const { types: orderTypes, resolvers: orderResolvers } = order;
const { types: authTypes, resolvers: authResolvers } = auth;
const { types: cloudOperationsTypes, resolvers: cloudOperationsResolvers } =
  cloudOperations;
const { types: generalTypes, resolvers: generalResolvers } = general;
const { types: productViewTypes, resolvers: productViewResolvers } =
  productView;
const { types: viewSettingsTypes, resolvers: viewSettingsResolvers } =
  viewSettings;
const { types: productPreferenceTypes, resolvers: productPreferenceResolvers } =
  productPreference;

export default {
  resolvers: merge(
    userResolvers,
    socialMediaResolvers,
    categoryResolvers,
    sellerResolvers,
    productResolvers,
    authResolvers,
    cloudOperationsResolvers,
    generalResolvers,
    orderResolvers,
    productViewResolvers,
    viewSettingsResolvers,
    productPreferenceResolvers
  ),
  typeDefs: [
    query,
    commonTypes,
    userTypes,
    socialMediaTypes,
    categoryTypes,
    sellerTypes,
    productTypes,
    authTypes,
    cloudOperationsTypes,
    generalTypes,
    orderTypes,
    productViewTypes,
    viewSettingsTypes,
    productPreferenceTypes
  ]
};
