import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';

// ---- Purge DB ----
// Dexie.delete('Observations');

export let db;

// Seperate Development and testing to own DB
if (process.env.NODE_ENV ===  'production') {
  db =  new Dexie('Observations');
} else if (process.env.NODE_ENV ===  'development') {
  db =  new Dexie('Testing_DB');
} else {

  // Setup fake indexDB for testing use
  db = new Dexie('testing_DB', { indexedDB: indexedDB, IDBKeyRange: FDBKeyRange});
}

// Tables and keys
db.version(1).stores({
  entries: '&id, name, notes, rarity, loc, date, picture'
});

export default db;