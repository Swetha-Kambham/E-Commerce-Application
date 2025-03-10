import { useQuery } from '@apollo/client';
import get from 'lodash.get';
import { SIGNED_URLS_FOR_OBJECT_DOWNLOAD } from 'modules/graphql';

export const useGetSignedUrlForObjectDownload = ({
  objectKeys,
  contentType,
  skip
}) => {
  const { loading, data } = useQuery(SIGNED_URLS_FOR_OBJECT_DOWNLOAD, {
    variables: {
      objectKeys,
      contentType
    },
    skip,
    fetchPolicy: 'network-only'
  });

  const urls = get(data, 'signedUrlsForObjectDownload', []);

  return {
    loading,
    urls
  };
};
