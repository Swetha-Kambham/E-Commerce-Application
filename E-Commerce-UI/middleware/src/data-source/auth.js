import { BaseDataSource } from './base';

export class AuthDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async initPhoneVerification(phoneNumber) {
    try {
      const res = await this.serviceClient.request(
        'LoginServices1',
        'InitPhoneVerification',
        {
          phoneNumber: phoneNumber
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async completePhoneVerification(phoneNumber, serviceSId, verificationCode) {
    try {
      const res = await this.serviceClient.request(
        'LoginServices1',
        'CompletePhoneVerification',
        {
          verificationData: {
            phoneNumber: phoneNumber,
            serviceSId: serviceSId,
            verificationCode: verificationCode
          }
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async userLogin(input) {
    try {
      const date = new Date();
      const loginTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const description = input.phoneNumber ? 'phone' : 'email';
      const res = await this.serviceClient.request(
        'LoginServices1',
        'UserLogin',
        {
          target: {
            emailAddress: input.emailAddress,
            phoneNumber: input.phoneNumber,
            password: input.password,
            loginTime: loginTime,
            description: description
          }
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async logout(input) {
    try {
      await this.serviceClient.request('LoginServices1', 'Logout', {
        target: {
          sessionId: input.sessionId
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getCurrentUser() {
    try {
      const res = await this.serviceClient.request(
        'AuthService1',
        'GetCurrentUser',
        {}
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async sellerLogin(input) {
    try {
      const date = new Date();
      const loginTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const description = input.phoneNumber ? 'phone' : 'email';
      const res = await this.serviceClient.request(
        'LoginServices1',
        'SellerLogin',
        {
          target: {
            emailAddress: input.emailAddress,
            phoneNumber: input.phoneNumber,
            password: input.password,
            loginTime: loginTime,
            description: description
          }
        }
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async login(input) {
    const serviceInput = { password: input.password };
    if (input.loginName) {
      serviceInput.loginName = input.loginName;
    }
    if (input.emailAddress) {
      serviceInput.emailAddress = input.emailAddress;
    }
    if (input.phoneNumber) {
      serviceInput['phoneNumber.countryCode'] = input.phoneNumber.countryCode;
      serviceInput['phoneNumber.phoneNumber'] = input.phoneNumber.phoneNumber;
    }
    try {
      const res = await this.serviceClient.request2(
        'auth',
        'login',
        serviceInput
      );

      return res;
    } catch (ex) {
      return null;
    }
  }
}
