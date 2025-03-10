import { useQuery } from '@apollo/client';
import get from 'lodash.get';
import { SIGNED_URLS_FOR_OBJECT_UPLOAD } from 'modules/graphql';

export const useGetSignedUrlForObjectUpload = ({ objectKeys, contentType }) => {
  const { loading, data } = useQuery(SIGNED_URLS_FOR_OBJECT_UPLOAD, {
    variables: {
      objectKeys,
      contentType
    },
    fetchPolicy: 'network-only'
  });

  const signedUrlsForObjectUpload = get(data, 'signedUrlsForObjectUpload', []);

  return {
    loading,
    signedUrlsForObjectUpload
  };
};
