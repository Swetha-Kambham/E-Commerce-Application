import {
  getSignedUrlsForUploadImages,
  createEmptyFolder,
  deleteImage,
  getSignedUrlsForObjectUpload,
  getSignedUrlsForObjectDownload,
  getListOfObjects,
  deleteObjects
} from './resolvers';
import { types } from './types';

export default {
  resolvers: {
    Query: {
      signedUrlsForUploadImages: getSignedUrlsForUploadImages,
      signedUrlsForObjectUpload: getSignedUrlsForObjectUpload,
      signedUrlsForObjectDownload: getSignedUrlsForObjectDownload,
      listOfObjects: getListOfObjects
    },
    Mutation: {
      createEmptyFolder: createEmptyFolder,
      deleteImage: deleteImage,
      deleteObjects: deleteObjects
    }
  },
  types: types
};
