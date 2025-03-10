import { config } from 'dotenv';
import { env } from 'process';

config('../.env');

export default {
  serviceUrl: env.SERVICE_URL,
  awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  bucket: env.BUCKET,
  region: env.REGION,
  productImageBaseFolder: env.PRODUCTS_IMAGE_BASE_FOLDER,
  productViewImageBaseFolder: env.PRODUCT_VIEW_IMAGE_BASE_FOLDER
};
