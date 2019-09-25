/*
These tests are used to determine the functionality of the Redux Store.
The reducer is heavily dependent on the functionality of IndexedDB.
IndexDB can then be tested at the same time, as if there is errors with IDB,
those errors will reflect to the reducer.

So we test them both here at the same time.
 */

import initStore from './store';
import dummy from './helpers/dummy';
import { initializeBirds, addBird, updateSingleBird, deleteBird } from './reducers/birdReducer';
import db from './services/DB';

describe('Redux tests', () => {
  let store;

  beforeEach(() => {
    store = initStore();
  });

  afterEach(() => {
    db.entries.clear();
  })

  test('Can delete states', async () => {
    await store.dispatch(addBird(dummy[0]));
    expect(store.getState().birds[0]).toMatchObject(dummy[0]);
  });

  test('Can delete states', async () => {
    await store.dispatch(addBird(dummy[0]));
    expect(store.getState().birds[0]).toMatchObject(dummy[0]);

    await store.dispatch(deleteBird(dummy[0].id));
    expect(store.getState().birds).toMatchObject([]);
  });

  test('Can update states', async () => {
    const bird = {
      id: 'asfasfsfas',
      name: 'new Name',
      notes: 'different notes woop!',
    };

    await store.dispatch(addBird(dummy[0]));
    expect(store.getState().birds[0]).toMatchObject(dummy[0]);

    await store.dispatch(updateSingleBird(bird));
    expect(store.getState().birds[0].name).toBe(bird.name);
    expect(store.getState().birds[0].notes).toBe(bird.notes);
  });

  test('Initializing from DB works', async () => {
    await Promise.all(
      dummy.map(dum => store.dispatch(addBird(dum)))
    );
    
    await store.dispatch(initializeBirds());

    expect(store.getState().birds.length).toBe(dummy.length);
  });
});