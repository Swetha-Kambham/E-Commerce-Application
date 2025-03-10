import { gql } from 'apollo-server';

export const types = gql`
  extend type Query {
    viewSettings(id: String, name: String): ViewSettings
  }

  extend type Mutation {
    putViewSettings(
      id: String
      name: String
      input: PutViewSettingsInput!
    ): Boolean
    deleteViewSettings(id: String, name: String): Boolean
  }

  input PutViewSettingsInput {
    name: String
    userId: String
    settings: [SettingsInput]
  }

  input SettingsInput {
    key: String
    value: [SettingsValueInput]
  }

  type Settings {
    key: String
    value: [SettingsValue]
  }

  type ViewSettings {
    id: String
    name: String
    userId: String
    settings: [Settings]
    enabled: Boolean
  }
`;
