import config from '../config'
import axios from 'axios'

const BASE_URL = config.api.baseUrl;
const DEFAULT_PARAMS = config.api.defaultParams;
const DEFAULT_OPTIONS = { headers: {'Content-Type': 'application/json'} };

export const OPERATORS = {
  limit: '_limit',
  lastId: 'id_gte'
}

const makeRequest = (method = 'get', endpoint, options = {}) => {
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
    params: {...DEFAULT_PARAMS, ...options.params}
  }
  const url = `${BASE_URL}/${endpoint}`;
  return axios({url, method, ...options})
    .then(response => response.data)
    .catch(response => {
      console.dir(response);
      return Promise.reject(response);
    })
};
export const createResource = (endpoint, payload) => makeRequest('post', `${endpoint}`, {payload});
export const getResource = (endpoint, id) => makeRequest('get', `${endpoint}/${id}`);
export const loadResources = (endpoint, params) => makeRequest('get', `${endpoint}`, {params});
export const updateResource = (endpoint, id, payload) => makeRequest('put', `${endpoint}/${id}`, {payload});
export const patchResource = (endpoint, id, payload) => makeRequest('patch', `${endpoint}/${id}`, {payload});
export const deleteResource = (endpoint, id) => makeRequest('delete', `${endpoint}/${id}`);

