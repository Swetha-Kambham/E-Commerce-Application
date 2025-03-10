import { BaseDataSource } from './base';

export class ViewSettingsDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async putViewSettings({ id, name, input }) {
    try {
      await this.serviceClient.request(
        'ViewSettingsService1',
        'PutViewSettings',
        {
          target: { name: name, id: id },
          viewSettings: input
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteViewSettings({ id, name }) {
    try {
      await this.serviceClient.request(
        'ViewSettingsService1',
        'DeleteViewSettings',
        {
          target: {
            id: id,
            name: name
          }
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getViewSettings({ id, name }) {
    try {
      const res = await this.serviceClient.request(
        'ViewSettingsService1',
        'GetViewSettings',
        {
          target: {
            id: id,
            name: name
          }
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }
}
