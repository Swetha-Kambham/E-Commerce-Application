import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    socialMedias: [SocialMedia]
    socialMedia(id: String!): SocialMedia
  }

  extend type Mutation {
    putSocialMediaAccount(id: String, input: SocialMediaInput): Boolean
    deleteSocialMediaAccount(id: String): Boolean
  }

  input SocialMediaInput {
    name: String
    url: String
    enabled: Boolean
  }

  type SocialMedia {
    id: String!
    name: String
    url: String
    enabled: Boolean
  }
`;
