import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const SOCIAL_MEDIA = gql`
  query socialMedias {
    socialMedias {
      id
      name
      url
      enabled
    }
  }
`;

export const useSocialMedias = () => {
  const { loading, data } = useQuery(SOCIAL_MEDIA, {
    fetchPolicy: 'network-only'
  });

  const socialMedias = get(data, 'socialMedias', []);

  return {
    loading,
    socialMedias
  };
};
