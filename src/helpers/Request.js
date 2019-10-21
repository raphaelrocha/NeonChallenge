import _ from 'lodash';
import HTTP_CODES from 'http-status-codes';
import fetch from 'react-native-cancelable-fetch';
import environments from "../__environments__/environments";
import {translate} from "../locales";

export default class Request {
  constructor(endpoint, info) {
    this.endpoint = endpoint;
    this.info = info;
  }

  async execute() {

    let url = this.endpoint;

    const FETCH_TIMEOUT = environments.DEFAULT_TIMEOUT;
    let didTimeOut = false;

    if(environments.SHOW_HTTP_LOGS){
        console.log('request',url);
    }

    return new Promise((resolve, reject) => {

      const timeout = setTimeout(function() {
        didTimeOut = true;
      }, FETCH_TIMEOUT);

      fetch(url, this.info, this.endpoint)
          .then((response) => {

            clearTimeout(timeout);

            if(didTimeOut){
              throw {message: translate('timeout'), code: 'timeout', url};
            }

            if (!_.inRange(response.status, HTTP_CODES.OK, HTTP_CODES.MULTIPLE_CHOICES)){

              return response.json().then(error =>{
                throw error;
              });
            }
            return response;

          })
          .then(response => response.json())
          .then(data =>{
              if(environments.SHOW_HTTP_LOGS){
                  console.log('Response success',url,data);
              }
              resolve(data);
          })
          .catch(err => {
            let error = err.toString();
            if(error === 'TypeError: Network request failed'){
              err = {message:translate('checkInternetConnection'),code:'noConnection'};
            }
            if(environments.SHOW_HTTP_LOGS){
                console.warn('Response error',url,err);
            }
            reject(err);
          });
    });
  }

  cancel() {
    fetch.abort(this.endpoint);
  }

}
