import { defineAction as define } from 'redux-define'
import config from '../config'

const NAMESPACE = config.nameSpace;

export const defineAsyncActions = key => define(key, ['PENDING', 'FULFILLED', 'REJECTED'], NAMESPACE);
