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

class User {
  constructor({ name, email, password }) {
    this.data = { name, email, password };
  }

  static findByEmail(email) {
    return dbPromise
      .then(db => transaction.start(db, null, GET, email))
      .then(user => successResponse(user))
      .catch(err => err);
  }

  static find() {
    return dbPromise
      .then(db => transaction.start(db, null, GET_ALL))
      .then(users => successResponse(users))
      .catch(err => errorResponse(err));
  }

  static create(data) {
    return addToDb(data);
  }

  save() {
    return addToDb(this.data);
  }
}

const addToDb = data =>
  dbPromise
    .then(db => transaction.start(db, 'readwrite', PUT, data).complete)
    .then(() => successResponse())
    .catch(err => errorResponse(err));

export default User;
