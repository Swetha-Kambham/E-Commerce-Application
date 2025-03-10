import axios from 'axios';
import { ApolloError } from 'apollo-server-errors';
import appConfig from '../config';
import qs from 'qs';

export class BaseDataSource {
  constructor(config) {
    this.baseURL = appConfig.serviceUrl;
    this.config = config;
  }

  request(rootPath, path, requestBody) {
    //for application/json

    const options = {
      method: (this.config && this.config.method) || 'POST',
      url: `${this.baseURL}/${rootPath}/${path}`,
      headers: {
        ...(this.config && this.config.headers && this.config.headers),
        Authorization:
          (this.config &&
            this.config.headers &&
            this.config.headers.authorization) ||
          null,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: requestBody
    };

    return new Promise((resolve, reject) =>
      axios
        .request(options)
        .then((response) => resolve(response && response.data))
        .catch((err) => {
          return reject(
            new ApolloError(
              (err &&
                err.response &&
                err.response.data &&
                err.response.data.message) ||
                'Internal Server Error',
              (err &&
                err.response &&
                err.response.data &&
                err.response.data.code) ||
                'INTERNAL_SERVER_ERROR',
              {
                type:
                  (err.response &&
                    err.response.data &&
                    err.response.data.type) ||
                  'INTERNAL_SERVER_ERROR'
              }
            )
          );
        })
    );
  }

  request2(rootPath, path, requestBody) {
    // for x-www-form-urlencoded
    const options = {
      method: (this.config && this.config.method) || 'POST',
      url: `${this.baseURL}/${rootPath}/${path}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(requestBody)
    };

    return new Promise((resolve, reject) =>
      axios
        .request(options)
        .then((response) => resolve(response && response.data))
        .catch((err) => {
          return reject(
            new ApolloError(
              (err &&
                err.response &&
                err.response.data &&
                err.response.data.message) ||
                'Internal Server Error',
              (err &&
                err.response &&
                err.response.data &&
                err.response.data.code) ||
                'INTERNAL_SERVER_ERROR',
              {
                type:
                  (err.response &&
                    err.response.data &&
                    err.response.data.type) ||
                  'INTERNAL_SERVER_ERROR'
              }
            )
          );
        })
    );
  }
}
