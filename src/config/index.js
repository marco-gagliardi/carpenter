import common from './common'
import development from './development'
import production from './production'
import merge from 'lodash/merge'

const defaultEnvironment = 'development';
const index = {
  development: development,
  production: production
};
export const env = process.env.NODE_ENV || defaultEnvironment;
const finalConfig = {...merge(common, index[env]), env};
export default finalConfig
