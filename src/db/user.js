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

export default {
  get(email) {
    return dbPromise
      .then(db => transaction.start(db, null, GET, email))
      .then(user => successResponse(user))
      .catch(err => err);
  },
  getAll() {
    return dbPromise
      .then(db => transaction.start(db, null, GET_ALL))
      .then(users => successResponse(users))
      .catch(err => errorResponse(err));
  },
  set(data) {
    return dbPromise
      .then(db => transaction.start(db, 'readwrite', PUT, data).complete)
      .then(() => successResponse())
      .catch(err => errorResponse(err));
  }
};
