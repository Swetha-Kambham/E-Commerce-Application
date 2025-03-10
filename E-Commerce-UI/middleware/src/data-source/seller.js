import { BaseDataSource } from './base';
import { mapToServiceDate } from './utils';

export class SellerDataSource {
  initialize(config) {
    this.serviceClient = new BaseDataSource(config);
  }

  async getAllSellers() {
    const res = await this.serviceClient.request(
      'SellerService1',
      'GetAllSellers',
      {}
    );

    return res;
  }

  async putSeller(id, input) {
    try {
      await this.serviceClient.request('SellerService1', 'PutSeller', {
        target: {
          id: id
        },
        seller: {
          name: input.name,
          storeName: input.storeName,
          gstNumber: input.gstNumber,
          description: input.description,
          dateOfBirth: mapToServiceDate(input.dateOfBirth),
          emailAddress: input.emailAddress,
          phoneNumber: input.phoneNumber,
          password: input.password,
          addressLine1: input.address ? input.address.addressLine1 : null,
          addressLine2: input.address ? input.address.addressLine2 : null,
          addressLine3: input.address ? input.address.addressLine3 : null,
          landmark: input.address ? input.address.landmark : null,
          city: input.address ? input.address.city : null,
          pinCode: input.address ? input.address.pinCode : null,
          stateId: input.address ? input.address.stateId : null
        }
      });

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updatePassword(sellerId, newPassword) {
    try {
      await this.serviceClient.request('SellerService1', 'UpdatePassword', {
        seller: {
          id: sellerId
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

  async updateSellerAddress(sellerId, address) {
    try {
      await this.serviceClient.request(
        'SellerService1',
        'UpdateSellerAddress',
        {
          target: {
            id: sellerId
          },
          address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            addressLine3: address.addressLine3,
            landmark: address.landmark,
            city: address.city,
            pinCode: address.pinCode,
            stateId: address.stateId
          }
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async updateSellerDetails(sellerId, input) {
    try {
      const details = {};

      if (input.name !== undefined) details.name = { value: input.name };
      if (input.storeName !== undefined)
        details.storeName = { value: input.storeName };
      if (input.description !== undefined)
        details.description = { value: input.description };
      if (input.dateOfBirth !== undefined)
        details.dateOfBirth = { value: mapToServiceDate(input.dateOfBirth) };
      if (input.emailAddress !== undefined)
        details.emailAddress = { value: input.emailAddress };
      if (input.phoneNumber !== undefined)
        details.phoneNumber = { value: input.phoneNumber };
      if (input.gstNumber !== undefined)
        details.gstNumber = { value: input.gstNumber };

      await this.serviceClient.request(
        'SellerService1',
        'UpdateSellerDetails',
        {
          target: {
            id: sellerId
          },
          details: details
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async putSellerFinancialDetails(sellerId, sellerFinancialDetails) {
    try {
      await this.serviceClient.request(
        'SellerService1',
        'PutSellerFinancialDetails',
        {
          target: {
            id: sellerId
          },
          financialDetails: sellerFinancialDetails
        }
      );

      return true;
    } catch (ex) {
      return null;
    }
  }

  async getSellerById(sellerId) {
    const input = {
      target: {
        id: sellerId
      }
    };
    const res = await this.serviceClient.request(
      'SellerService1',
      'GetSellerDetails',
      input
    );

    return res;
  }

  async getSellerBySessionId(sessionId) {
    const input = {
      target: {
        id: sessionId
      }
    };

    const res = await this.serviceClient.request(
      'SellerService1',
      'GetSellerDetails1',
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
        'SellerService1',
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
        'SellerService1',
        'ValidateEmailAddress',
        input
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async validateStoreName(storeName) {
    const input = {
      storeName: storeName
    };

    try {
      const res = await this.serviceClient.request(
        'SellerService1',
        'ValidateStoreName',
        input
      );

      return res;
    } catch (ex) {
      return null;
    }
  }

  async requestVerificationCode(id, emailAddress, phoneNumber) {
    const input = {
      seller: {
        id: id,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress
      }
    };

    const res = await this.serviceClient.request(
      'SellerService1',
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
      'SellerService1',
      'VerifyVerificationCode',
      input
    );

    return res;
  }
}
