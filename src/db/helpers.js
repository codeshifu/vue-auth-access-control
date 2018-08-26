export const actions = {
  GET_ALL: 'getAll',
  GET: 'get',
  PUT: 'put',
  delete: 'delete'
};

export const transaction = {
  storeName: null,
  start(db, mode, action, actionParam) {
    return db
      .transaction(this.storeName, mode || 'readonly')
      .objectStore(this.storeName)
      [action](actionParam);
  }
};

export const successResponse = (data = null) => ({ status: 200, data });
export const errorResponse = err => ({ status: 500, msg: err.message });
