import Dexie from 'dexie';

// ---- Purge DB ----
// Dexie.delete('Observations');

export const db = new Dexie('Observations');

// Tables and keys
db.version(1).stores({
  entries: '&id, name, notes, rarity, loc, date, picture'
});

export default db;