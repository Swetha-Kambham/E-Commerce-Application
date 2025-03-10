import { BaseDataSource } from './base';

export class CategoryDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getAllCategories() {
    const res = await this.serviceClient.request(
      'CategoryService1',
      'GetAllCategories',
      {}
    );

    return res;
  }

  async getCategory(id) {
    try {
      const res = await this.serviceClient.request(
        'CategoryService1',
        'GetCategory',
        {
          target: {
            id: id
          }
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async putCategory(id, categoryInput) {
    const method = id === null ? 'PutCategory' : 'UpdateCategory';
    try {
      await this.serviceClient.request('CategoryService1', method, {
        target: {
          id: id
        },
        category: categoryInput
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteCategory(id) {
    try {
      await this.serviceClient.request('CategoryService1', 'DeleteCategory', {
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
