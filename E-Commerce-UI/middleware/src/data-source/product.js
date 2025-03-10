import { BaseDataSource } from './base';
import { AWSS3Operations } from './aws-s3-operations';
import { v4 } from 'uuid';
import configuration from '../config';

export class ProductDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
    this.awsS3 = new AWSS3Operations();
    this.awsS3.initialize(config);
    this.productImageBaseFolder = configuration.productImageBaseFolder;
  }

  async getAllProducts(page, pageSize, filters) {
    const res = await this.serviceClient.request(
      'ProductService1',
      'GetAllProducts',
      {
        page: page,
        pageSize: pageSize,
        filters: filters
      }
    );

    return res;
  }

  async getPageOfProductUnits(page, pageSize, filters) {
    const res = await this.serviceClient.request(
      'ProductService1',
      'GetPageOfProductUnits',
      { page: page, pageSize: pageSize, filters: filters }
    );

    const imageUrls = await Promise.all(
      res.map((r) => this.getImageUrlsForSKUs(r.productId, [r.skuId]))
    );

    return res.map((r, index) => ({
      ...r,
      id: v4(),
      images: imageUrls[index][r.skuId] || []
    }));
  }

  async getProductUnitDetail(productId, productSlug, skuId, sku) {
    const res = await this.serviceClient.request(
      'ProductService1',
      'GetProductUnitDetail',
      {
        product: { id: productId, slug: productSlug },
        sku: { skuId: skuId, sku: sku }
      }
    );

    const imageUrl = await this.getImageUrlsForSKUs(res.productId, [res.skuId]);

    return { ...res, id: v4(), images: imageUrl[res.skuId] };
  }

  async putProduct(id, productInput) {
    const input = {
      product: productInput
    };

    try {
      const result = await this.serviceClient.request(
        'ProductService1',
        'PutProduct',
        input
      );

      await this.awsS3.createEmptyFolder(`${result.id}/`);

      return result;
    } catch (ex) {
      return null;
    }
  }

  async updateProductBasicDetails(id, productInput) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductBasicDetails',
        {
          target: { id: id },
          product: productInput
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async changeProductStatus(id, status, remark) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'ChangeProductStatus',
        {
          product: { id: id },
          status: status,
          remark: remark
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateProductDescription(id, description) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductDescription',
        {
          target: { id: id },
          description: description
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateProductTag(id, tags) {
    try {
      await this.serviceClient.request('ProductService1', 'UpdateProductTag', {
        target: { id: id },
        tags: tags
      });

      return true;
    } catch (ex) {
      return null;
    }
  }
  async updateProductLocationTag(id, locationTags) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductLocationTag',
        {
          target: { id: id },
          locationTags: locationTags
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getProductDetails(id) {
    try {
      const result = await this.serviceClient.request(
        'ProductService1',
        'GetProductDetails',
        {
          target: {
            id: id
          }
        }
      );

      return result;
    } catch (ex) {
      return null;
    }
  }

  async getProductOptionAndValues(productId) {
    try {
      const result = await this.serviceClient.request(
        'ProductService1',
        'GetProductOptionAndValues',
        {
          target: {
            id: productId
          }
        }
      );

      return result;
    } catch (ex) {
      return null;
    }
  }

  async getProductSkus(productId) {
    try {
      const result = await this.serviceClient.request(
        'ProductService1',
        'GetProductSkus',
        {
          target: {
            id: productId
          }
        }
      );

      const imageObjects = await this.awsS3.listAllObjects(productId);

      const images = await this.awsS3.getSignedUrlsForImagesDownload(
        imageObjects
      );

      return result.map((res) => ({
        ...res,
        images: images
          .filter(
            (i) =>
              i.Key.includes(res.skuId) &&
              (i.Key.toLocaleLowerCase().endsWith('.jpeg') ||
                i.Key.toLocaleLowerCase().endsWith('.jpg'))
          )
          .map((i) => ({ url: i.url, key: i.Key }))
      }));
    } catch (ex) {
      return null;
    }
  }

  async putProductSKU(productId, skuId, skusInput) {
    try {
      const result = await this.serviceClient.request(
        'ProductService1',
        'PutProductSKU',
        {
          target: {
            id: productId
          },
          sku: { skuId: skuId },
          skuDetails: {
            sku: skusInput.code,
            quantity: skusInput.quantity,
            currencyId: skusInput.currencyId,
            pricePerUnit: skusInput.pricePerUnit,
            sellingPricePerUnit: skusInput.sellingPricePerUnit,
            optionAndValues: skusInput.optionAndValues || []
          }
        }
      );

      return result;
    } catch (ex) {
      return null;
    }
  }

  async getSignedUrlForProductSKUImages(productId, skuId, images) {
    try {
      const result = await this.awsS3.getSignedUrlsForImagesUpload2(
        (images || []).map((image) => ({
          contentType: image.contentType,
          key: `${this.productImageBaseFolder}/${productId}/${skuId}/${image.fileName}`
        }))
      );

      return result;
    } catch (ex) {
      return null;
    }
  }

  async getImageUrlsForSKUs(productId, skuIds) {
    const uniqueSKUIds = [...new Set(skuIds || [])];
    try {
      const objects = await this.awsS3.listObjects(
        `${this.productImageBaseFolder}/${productId}/`,
        uniqueSKUIds.length * 20
      );

      const urls = await this.awsS3.getSignedUrlsForImagesDownload2(objects);

      return uniqueSKUIds.reduce((retVal, curr) => {
        const imageObjects = (urls || []).filter((r) => r.path.includes(curr));
        return {
          ...retVal,
          [curr]: imageObjects
        };
      }, {});
    } catch (ex) {
      return null;
    }
  }

  async deleteProductSKU(productId, skuId) {
    try {
      await this.serviceClient.request('ProductService1', 'DeleteProductSKU', {
        product: { id: productId },
        target: {
          skuId: skuId
        }
      });

      const objects = await this.awsS3.listObjects(
        `${this.productImageBaseFolder}/${productId}/${skuId}/`,
        20
      );

      this.awsS3.deleteObject2((objects || []).map((object) => object.key));

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateProductSKUPricePerUnit(productId, skuId, pricePerUnit) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductSKUPricePerUnit',
        {
          target: {
            productId: productId,
            skuId: skuId
          },
          pricePerUnit: pricePerUnit
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateProductSKUSellingPricePerUnit(
    productId,
    skuId,
    sellingPricePerUnit
  ) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductSKUSellingPricePerUnit',
        {
          target: {
            productId: productId,
            skuId: skuId
          },
          sellingPricePerUnit: sellingPricePerUnit
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateProductSKUQuantity(productId, skuId, quantity) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'UpdateProductSKUQuantity',
        {
          target: {
            productId: productId,
            skuId: skuId
          },
          quantity: quantity
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async putProductOptionAndValues(input) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'PutProductOptionAndValues',
        {
          target: {
            id: input.productId
          },
          productOptionValue: input.productOptionValue
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteProductOption(input) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'DeleteProductOption',
        {
          product: {
            id: input.productId
          },
          target: { optionId: input.optionId }
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteProductOptionValue(input) {
    try {
      await this.serviceClient.request(
        'ProductService1',
        'DeleteProductOptionValue',
        {
          product: { id: input.productId },
          option: { optionId: input.optionId },
          valueId: input.valueId
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }
}
