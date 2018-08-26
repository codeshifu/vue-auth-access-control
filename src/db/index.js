import idb from 'idb';
import { USER_STORE } from './user';
const DB_VERSION = 1;

const dbPromise = idb.open('blog', DB_VERSION, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore(USER_STORE, { keyPath: 'id' });
  }
});

export default dbPromise;
