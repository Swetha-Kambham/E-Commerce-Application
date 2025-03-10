import { gql } from 'apollo-server';

export const types = gql`
  scalar Metadata

  extend type Query {
    signedUrlsForUploadImages(
      productId: String!
      skuId: String
      inputs: [SignedUrlForUploadImageInput!]
    ): [String]
    signedUrlsForObjectUpload(
      objectKeys: [String!]
      contentType: String
    ): [SignedUrl]
    signedUrlsForObjectDownload(
      objectKeys: [String!]
      contentType: String
    ): [SignedUrl]
    listOfObjects(prefix: String!, maxKey: Int!): [ListObjectResult]
  }

  extend type Mutation {
    deleteObjects(objectKeys: [String!]): Boolean
  }

  type SignedUrl {
    id: String!
    url: String
    file: String
    path: String
  }

  type ListObjectResult {
    id: String!
    key: String!
    size: Int
  }

  extend type Mutation {
    createEmptyFolder(key: String!): Boolean
    deleteImage(key: String!): Boolean
  }

  input SignedUrlForUploadImageInput {
    signedUrlExpireSeconds: Int
    fileName: String!
    contentType: String
    metadata: Metadata
  }
`;
