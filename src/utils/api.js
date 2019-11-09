import config from '../config'
import axios from 'axios'

const BASE_URL = config.api.baseUrl;
const DEFAULT_PARAMS = config.api.defaultParams;
const DEFAULT_OPTIONS = { headers: {'Content-Type': 'application/json'} };
const buildQueryString = (obj = {}) => {
  if (typeof obj !== 'object' || Object.keys(obj).length === 0) {
    return ''
  }
  return '?' + Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
};
const makeRequest = (method = 'get', endpoint, options = {}) => {
  const {params, ...rest} = options;
  const queryStringParams = {...DEFAULT_PARAMS, ...params};
  const url = `${BASE_URL}/${endpoint}${buildQueryString(queryStringParams)}`;
  options = {...DEFAULT_OPTIONS, ...rest};
  return axios({url, method, ...options})
    .then(response => response.data)
    .catch(response => {
      console.dir(response);
      return Promise.reject(response);
    })
};
export const createResource = (resource, payload) => makeRequest('post', `${resource}`, {payload});
export const getResource = (resource, id) => makeRequest('get', `${resource}/${id}`);
export const loadResources = (resource, params) => makeRequest('get', `${resource}`, {params});
export const updateResource = (resource, id, payload) => makeRequest('put', `${resource}/${id}`, {payload});
export const deleteResource = (resource, id) => makeRequest('delete', `${resource}/${id}`);

