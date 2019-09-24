const crypto = require('crypto');
import dbService from '../services/reguests';
import filters from '../helpers/filters';
import animate from '../helpers/animations';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BIRD':
    return action.data.sort(filters.sortDateDesc);
  case 'ADD_BIRD':
    return [ ...state ].concat(action.data).sort(filters.sortDateDesc);
  case 'REMOVE_BIRD':
    return state.filter(bird => bird.id !== action.id);
  case 'UPDATE_BIRDS':
    return action.data;
  case 'UPDATE_BIRD':
    return state.map(bird => bird.id === action.data.id ? action.data : bird);
  default:
    return state;
  }
};

// Initialize data
export const initializeBirds = () => {
  return async dispatch => {
    try {

      // Get all entries from the local database
      const all = await dbService.getAll();

      // Initialize app with local data
      dispatch({
        type: 'INIT_BIRD',
        data: all,
      });
    } catch (er) {
      console.log(er);
    }
  };
};

// Add new entry
export const addBird = (data) => {

  // Add id from a random hash string
  const id = !data.id ? crypto.randomBytes(24).toString('hex') : data.id;
  
  // Get time & date of creation in milliseconds
  const date = !data.date ? new Date().getTime() : data.date;

  const newBird= { ...data, id, date };
  
  return async dispatch => {
    try {
      
      // Add entry to the local database
      await dbService.addEntry(newBird);

      dispatch({
        type: 'ADD_BIRD',
        data: newBird
      });
    } catch (er) {
      animate.message('error', `Something went wrong: ${er.message}`);
      console.log(er);
    }
  };
};

// Update all birds states
export const updateBirds = (data) => {
  return {
    type: 'UPDATE_BIRDS',
    data
  };
};

// Update single bird entry
export const updateSingleBird = (data) => {
  return async dispatch => {
    try {
      
      // Update entry to local database
      const updatedBird = await dbService.updateEntry(data);

      dispatch({
        type: 'UPDATE_BIRD',
        data: updatedBird
      });
    } catch (er) {
      animate.message('error', `Something went wrong: ${er.message}`);
      console.log(er);
    }
  };
};

// Delete entry
export const deleteBird = (id) => {
  return async dispatch => {
    try {
      
      // Delete entry from the local database
      await dbService.deleteEntry(id);

      dispatch({
        type: 'REMOVE_BIRD',
        id,
      });
    } catch (er) {
      animate.message('error', `Something went wrong: ${er.message}`);
      console.log(er);
    }
  };
};


export default reducer;
