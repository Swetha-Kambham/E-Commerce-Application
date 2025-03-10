import { BaseDataSource } from './base';

export class UserDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getAllUsers() {
    const res = await this.serviceClient.request(
      'UserService1',
      'GetAllUsers',
      {}
    );

    return res;
  }

  async putUser(id, input) {
    try {
      await this.serviceClient.request('UserService1', 'PutUser', {
        target: {
          id: id
        },
        user: {
          name: input.name,
          emailAddress: input.emailAddress,
          phoneNumber: input.phoneNumber,
          password: input.password
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getUserAddresses(userId) {
    try {
      const addresses = await this.serviceClient.request(
        'UserService1',
        'GetUserAddresses',
        {
          target: {
            id: userId
          }
        }
      );

      return addresses;
    } catch (ex) {
      return null;
    }
  }

  async putAddress(userId, addressId, address) {
    try {
      await this.serviceClient.request('UserService1', 'PutAddress', {
        user: {
          id: userId
        },
        target: {
          id: addressId
        },
        address: address
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async deleteAddress(userId, addressId) {
    try {
      await this.serviceClient.request('UserService1', 'DeleteAddress', {
        user: {
          id: userId
        },
        target: {
          id: addressId
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updatePassword(userId, newPassword) {
    try {
      await this.serviceClient.request('UserService1', 'UpdatePassword', {
        user: {
          id: userId
        },
        newPassword: {
          password: newPassword
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async userLogin(input) {
    try {
      const date = new Date();
      const loginTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const description = /^[+]{1}[0-9]{12}$/.test(input.loginName)
        ? 'phone'
        : 'email';
      const res = await this.serviceClient.request(
        'LoginServices1',
        'UserLogin',
        {
          target: {
            loginName: input.loginName,
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

  async userLogout(input) {
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

  async getUserById(id) {
    const input = {
      target: {
        id: id,
        primaryEmailAddress: null,
        primaryPhoneNumber: null
      }
    };
    const res = await this.serviceClient.request(
      'UserService1',
      'GetUserDetails',
      input
    );

    return res;
  }

  async getUserBySessionId(sessionId) {
    const input = {
      target: {
        id: sessionId
      }
    };

    const res = await this.serviceClient.request(
      'UserService1',
      'GetCurrentUser',
      input
    );

    return res;
  }

  async validatePhoneNumber(phoneNumber) {
    const input = {
      phoneNumber: phoneNumber
    };

    try {
      const res = await this.serviceClient.request(
        'UserService1',
        'ValidatePhoneNumber',
        input
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async validateEmailAddress(emailAddress) {
    const input = {
      emailAddress: emailAddress
    };

    try {
      const res = await this.serviceClient.request(
        'UserService1',
        'ValidateEmailAddress',
        input
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async requestVerificationCode(id, emailAddress, phoneNumber) {
    const input = {
      user: {
        id: id,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress || null
      }
    };

    const res = await this.serviceClient.request(
      'UserService1',
      'RequestVerificationCode',
      input
    );

    return res;
  }

  async verifyVerificationCode({
    serviceSId,
    emailAddress,
    phoneNumber,
    verificationCode,
    channel
  }) {
    const input = {
      verificationData: {
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        serviceSId: serviceSId,
        verificationCode: verificationCode,
        channel: channel
      }
    };

    const res = await this.serviceClient.request(
      'UserService1',
      'VerifyVerificationCode',
      input
    );

    return res;
  }
}
