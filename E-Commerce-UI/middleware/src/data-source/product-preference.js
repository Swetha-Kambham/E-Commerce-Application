import { BaseDataSource } from './base';
import { productPreferenceTypes } from './utils';

export class ProductPreferenceDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getAllPreferencesForUser(userId, filter) {
    const res = await this.serviceClient.request(
      'UserService2',
      'GetAllPreferencesForUser',
      {
        user: {
          id: userId
        },
        filter: {
          type: productPreferenceTypes[filter.type]
        }
      }
    );

    return res;
  }

  async putProductPreference(userId, productId, skuId, quantity, type) {
    try {
      await this.serviceClient.request('UserService2', 'PutProductPreference', {
        user: {
          id: userId
        },
        product: { id: productId },
        sku: {
          skuId: skuId
        },
        quantity: quantity,
        type: productPreferenceTypes[type]
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updatePreferenceQuantity(id, quantity) {
    try {
      await this.serviceClient.request(
        'UserService2',
        'UpdatePreferenceQuantity',
        {
          target: {
            id: id
          },
          quantity: quantity
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deletePreference(id) {
    try {
      await this.serviceClient.request('UserService2', 'DeletePreference', {
        target: {
          id: id
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }
}
