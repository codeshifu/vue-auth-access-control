import dbPromise from './index';
import {
  transaction,
  actions,
  successResponse,
  errorResponse
} from './helpers';

export const USER_STORE = 'users';

transaction.storeName = USER_STORE;

const { GET, PUT, GET_ALL } = actions;
const defaultCallback = data => console.log(data);

export default {
  get(id, callback = defaultCallback) {
    dbPromise
      .then(db => transaction.start(db, null, GET, id))
      .then(user => callback(successResponse(user)))
      .catch(err => callback(errorResponse(err)));
  },
  getAll(callback = defaultCallback) {
    dbPromise
      .then(db => transaction.start(db, null, GET_ALL))
      .then(users => callback(successResponse(users)))
      .catch(err => callback(errorResponse(err)));
  },
  set(data, callback = defaultCallback) {
    dbPromise
      .then(db => transaction.start(db, 'readwrite', PUT, data).complete)
      .then(() => callback(successResponse()))
      .catch(err => errorResponse(err));
  }
};
