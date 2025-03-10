import { BaseDataSource } from './base';

export class GeneralDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getAllStates() {
    const res = await this.serviceClient.request(
      'GeneralService1',
      'GetAllStates',
      {}
    );

    return res;
  }

  async getBaseCurrency() {
    const res = await this.serviceClient.request(
      'GeneralService1',
      'GetBaseCurrency',
      {}
    );

    return res;
  }
}
