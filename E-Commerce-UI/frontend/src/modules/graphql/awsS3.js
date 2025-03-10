import { gql } from '@apollo/client';

export const SIGNED_URLS_FOR_OBJECT_UPLOAD = gql`
  query signedUrlsForObjectUpload(
    $objectKeys: [String!]
    $contentType: String
  ) {
    signedUrlsForObjectUpload(
      objectKeys: $objectKeys
      contentType: $contentType
    ) {
      id
      url
      file
    }
  }
`;

export const SIGNED_URLS_FOR_OBJECT_DOWNLOAD = gql`
  query signedUrlsForObjectDownload(
    $objectKeys: [String!]
    $contentType: String
  ) {
    signedUrlsForObjectDownload(
      objectKeys: $objectKeys
      contentType: $contentType
    ) {
      id
      url
      file
    }
  }
`;
