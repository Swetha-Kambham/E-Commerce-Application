import { BaseDataSource } from './base';
import { ViewSettingsDataSource } from './view-settings';
import configuration from '../config';
import { AWSS3Operations } from './aws-s3-operations';

export class ProductViewDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
    this.viewSettings = new ViewSettingsDataSource();
    this.viewSettings.initialize(config);
    this.awsS3 = new AWSS3Operations();
    this.awsS3.initialize(config);
    this.productViewImageBaseFolder = configuration.productViewImageBaseFolder;
  }

  async putProductView(input) {
    try {
      const res = await this.serviceClient.request(
        'ProductService2',
        'PutProductView',
        {
          productView: input
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async updateProductView(id, productView) {
    try {
      await this.serviceClient.request('ProductService2', 'UpdateProductView', {
        target: { id: id },
        productView: productView
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteProductView(id, name) {
    try {
      await this.serviceClient.request('ProductService2', 'DeleteProductView', {
        target: { id: id }
      });

      await this.viewSettings.deleteViewSettings({ name: name });

      const objects = await this.awsS3.listObjects(
        `${this.productViewImageBaseFolder}/${id}/`,
        20
      );

      this.awsS3.deleteObject2((objects || []).map((object) => object.key));

      return true;
    } catch (ex) {
      return null;
    }
  }

  async addOrUpdateProductUnitsToProductView(id, productUnits) {
    try {
      await this.serviceClient.request(
        'ProductService2',
        'AddOrUpdateProductUnitsToProductView',
        {
          target: { id: id },
          productUnits: productUnits || []
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getSignedUrlForProductViewImagesUpload(id, images) {
    try {
      const result = await this.awsS3.getSignedUrlsForImagesUpload2(
        (images || []).map((image) => ({
          contentType: image.contentType,
          key: `${this.productViewImageBaseFolder}/${id}/${image.fileName}`
        }))
      );

      return result;
    } catch (ex) {
      return null;
    }
  }

  async getSignedUrlForProductViewImagesDownload(id) {
    try {
      const objects = await this.awsS3.listObjects(
        `${this.productViewImageBaseFolder}/${id}/`,
        20
      );

      const urls = await this.awsS3.getSignedUrlsForImagesDownload2(objects);

      return urls;
    } catch (ex) {
      return null;
    }
  }

  async getProductViewDetails(id) {
    try {
      const res = await this.serviceClient.request(
        'ProductService2',
        'GetProductViewDetails',
        {
          target: { id: id }
        }
      );

      const images = await this.getSignedUrlForProductViewImagesDownload(id);

      return { ...res, images: images };
    } catch (ex) {
      return null;
    }
  }

  async getPageOfProductView(page = 1, pageSize = 100, filters) {
    try {
      const res = await this.serviceClient.request(
        'ProductService2',
        'GetPageOfProductView',
        {
          page: page,
          pageSize: pageSize,
          filters: filters
        }
      );

      return Promise.all(
        res.map((r) => ({
          ...r,
          images: this.getSignedUrlForProductViewImagesDownload(r.id)
        }))
      );
    } catch (ex) {
      return null;
    }
  }

  async getViewProducts(page = 1, pageSize = 100, filters) {
    try {
      const res = await this.serviceClient.request(
        'ProductService2',
        'GetViewProducts',
        {
          page: page,
          pageSize: pageSize,
          filters: filters
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }
}
