import { UserDataSource } from './user';
import { SocialMediaDataSource } from './social-media';
import { CategoryDataSource } from './category';
import { SellerDataSource } from './seller';
import { ProductDataSource } from './product';
import { AuthDataSource } from './auth';
import { AWSS3Operations } from './aws-s3-operations';
import { GeneralDataSource } from './general';
import { OrderDataSource } from './order';
import { ProductViewDataSource } from './product-view';
import { ViewSettingsDataSource } from './view-settings';
import { ProductPreferenceDataSource } from './product-preference';

export const dataSource = {
  user: new UserDataSource(),
  socialMedia: new SocialMediaDataSource(),
  category: new CategoryDataSource(),
  seller: new SellerDataSource(),
  product: new ProductDataSource(),
  auth: new AuthDataSource(),
  awsS3: new AWSS3Operations(),
  general: new GeneralDataSource(),
  order: new OrderDataSource(),
  productView: new ProductViewDataSource(),
  viewSettings: new ViewSettingsDataSource(),
  productPreference: new ProductPreferenceDataSource()
};
