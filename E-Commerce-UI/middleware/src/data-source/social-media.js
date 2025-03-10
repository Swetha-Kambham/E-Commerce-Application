import { BaseDataSource } from './base';

export class SocialMediaDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getSocialMediaAccounts() {
    const res = await this.serviceClient.request(
      'GeneralService1',
      'GetAllSocialMediaAccounts',
      {}
    );

    return res;
  }

  async getSocialMediaAccount(id) {
    const res = await this.serviceClient.request(
      'GeneralService1',
      'GetSocialMediaAccount',
      {
        target: {
          id: id
        }
      }
    );

    return res;
  }

  async putSocialMediaAccount(id, input) {
    try {
      await this.serviceClient.request(
        'GeneralService1',
        'PutSocialMediaAccount',
        {
          target: {
            id: id
          },
          socialMedia: {
            name: input.name,
            url: input.url,
            enabled: input.enabled
          }
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteSocialMediaAccount(id) {
    try {
      await this.serviceClient.request(
        'GeneralService1',
        'DeleteSocialMediaAccount',
        {
          target: {
            id: id
          }
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }
}
