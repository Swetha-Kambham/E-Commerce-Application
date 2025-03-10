import AWS from 'aws-sdk';
import config from '../config';
import { BaseDataSource } from './base';

export class AWSS3Operations {
  initialize(configuration) {
    this.serviceClient = new BaseDataSource(configuration);
    this.s3 = new AWS.S3({
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
      useAccelerateEndpoint: true,
      signatureVersion: 'v4',
      region: config.region
    });
    this.bucket = config.bucket;
    this.signedUrlExpireSeconds = 604800;
    this.contentType = 'image/jpeg';
    this.acl = 'public-read';
    this.productImageBaseFolder = config.productImageBaseFolder;
  }

  async getSignedUrlsForImagesUpload2(objects) {
    const urls = await this.serviceClient.request(
      'AWSS3Service1',
      'GetSignedUrlsForObjectUpload',
      {
        options: {
          objects: objects
        }
      }
    );

    return urls;
  }

  async getSignedUrlsForImagesDownload2(objects) {
    const urls = await this.serviceClient.request(
      'AWSS3Service1',
      'GetSignedUrlsForObjectDownload',
      {
        options: {
          objects: (objects || []).map((object) => ({
            key: object.key,
            contentType: object.contentType
          }))
        }
      }
    );

    return urls;
  }

  async listObjects(prefix, maxKey) {
    const objects = await this.serviceClient.request(
      'AWSS3Service1',
      'ListObjects',
      {
        options: {
          prefix: prefix,
          maxKey: maxKey
        }
      }
    );

    return objects;
  }

  async deleteObject2(objectKeys) {
    await this.serviceClient.request('AWSS3Service1', 'DeleteObject', {
      objectKeys: objectKeys || []
    });
  }

  getSignedUrlsForImagesUpload(productId, skuId, inputs) {
    try {
      const urls = Promise.all(
        (inputs || []).map((input) => {
          const params = {
            Bucket: this.bucket,
            Key: skuId
              ? `${this.productImageBaseFolder}/${productId}/${skuId}/${input.fileName}`
              : `${this.productImageBaseFolder}/${productId}/${input.fileName}`,
            Expires:
              input.signedUrlExpireSeconds || this.signedUrlExpireSeconds,
            ACL: this.acl,
            ContentType: input.contentType || this.contentType,
            Metadata: input.metadata || []
          };

          return this.s3.getSignedUrlPromise('putObject', params);
        })
      ).then((res) => res);

      return urls;
    } catch (ex) {
      return null;
    }
  }

  getSignedUrlsForImagesDownload(inputs) {
    const urls = Promise.all(
      (inputs || []).map((input) => {
        const params = {
          Bucket: this.bucket,
          Key: input.Key,
          Expires: input.signedUrlExpireSeconds || this.signedUrlExpireSeconds
        };

        return this.s3.getSignedUrlPromise('getObject', params);
      })
    )
      .then((res) =>
        (inputs || []).map((input, index) => ({ ...input, url: res[index] }))
      )
      .catch((err) => {
        return null;
      });

    return urls;
  }

  async listAllObjects(prefix, maxKey) {
    try {
      const params = {
        Bucket: this.bucket,
        MaxKeys: maxKey || 20,
        Prefix: prefix
          ? `${this.productImageBaseFolder}/`
          : `${this.productImageBaseFolder}/${prefix}`
      };

      const res = await this.s3.listObjects(params).promise();

      return res.Contents.filter((r) => r.Size > 0);
    } catch (ex) {
      return null;
    }
  }

  async deleteObject(key) {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key
      };

      await this.s3.deleteObject(params).promise();

      return true;
    } catch (ex) {
      return null;
    }
  }

  async createEmptyFolder(key) {
    try {
      const params = {
        Bucket: this.bucket,
        Key: `${this.productImageBaseFolder}/${key}/`
      };

      await this.s3.putObject(params);

      return true;
    } catch (ex) {
      return null;
    }
  }
}
