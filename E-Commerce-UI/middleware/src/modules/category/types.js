import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    categories: [Category]
    category(id: String!): CategoryDetail
  }

  extend type Mutation {
    putCategory(id: String, categoryInput: CategoryInput): Boolean
    deleteCategory(id: String!): Boolean
  }

  input CategoryInput {
    name: String
    description: String
    parentId: Int
    enabled: Boolean
  }

  type CategoryDetail {
    id: String
    name: String
    description: String
    parent: CategoryReference
    hierarchy: String
    hierarchyName: String
    enabled: Boolean
  }

  type CategoryReference {
    id: String
    name: String
  }

  type Category {
    id: String!
    name: String
    description: String
    parent: CategoryReference
    enabled: Boolean
  }
`;
