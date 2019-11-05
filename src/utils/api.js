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
      console.error("HTTP error: ", response);
      throw Error(response);
    })

};
export const createUser = payload => makeRequest('post', `users`, {payload});
export const getUser = id => makeRequest('get', `users/${id}`);
export const loadUsers = params => makeRequest('get', `users`, {params});
export const updateUser = (id, payload) => makeRequest('post', `users/${id}`, {payload});
export const deleteUser = id => makeRequest('delete', `users/${id}`);

