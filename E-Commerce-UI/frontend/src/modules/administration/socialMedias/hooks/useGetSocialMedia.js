import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const SOCIAL_MEDIA = gql`
  query socialMedia($id: String!) {
    socialMedia(id: $id) {
      id
      name
      url
      enabled
    }
  }
`;

export const useGetSocialMedia = ({ id }) => {
  const { loading, data } = useQuery(SOCIAL_MEDIA, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });

  const socialMedia = get(data, 'socialMedia', {});

  return {
    loading,
    socialMedia
  };
};
