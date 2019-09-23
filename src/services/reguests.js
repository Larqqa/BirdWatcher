import db from './DB';

const dbService = {

  // POST: new entry
  addEntry: async (obj) => {
    await db.entries.add(obj);
    console.log(`${obj.name} added`);
  },

  // GET: single entry by query & value
  getEntry: async (q, val) => {
    const singleEntry = await db.entries.where(q).equals(val).first();
    return singleEntry;
  },

  // GET: all entries
  getAll: async () => {
    const allEntries = await db.entries.toArray();
    return allEntries;
  },

  // PUT: update entry data
  updateEntry: async (obj) => {
    const updatedEntry = await db.entries.update(obj.id, obj);
    console.log(updatedEntry, 'Entry updated');

    // Get updated object from local database
    return dbService.getEntry('id', obj.id);
  },

  // DELETE
  deleteEntry: async (id) => {
    await db.entries.delete(id);
    console.log('entry deleted');
  },
};

export default dbService;