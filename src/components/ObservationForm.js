import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addBird, updateSingleBird } from '../reducers/birdReducer';
import filters from '../helpers/filters';

const ObservationForm = (props) => {
  const [ name, setName ] = useState('');
  const [ rarity, setRarity ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ location, setLocation ] = useState('No location given');

  const bird = props.bird;

  // Init form values, if prop was found
  useEffect(() => {
    
    if (bird) {
      setName(bird.name);
      setRarity(bird.rarity);
      setNotes(bird.notes);
      setLocation(bird.loc);
    } else {
      setGeoLocation();
    }
  }, [ props.bird ]);

  // Change form values
  const handleChange = (e) => {
    switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'rarity':
      setRarity(e.target.value);
      break;
    case 'notes':
      setNotes(e.target.value);
      break;
    default:
      break;
    }
  };

  // Get current geolocation using the Geolocation API
  const getGeoLocation = (success) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
  
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // Set new geolocation to state
  const setGeoLocation = () => {
    getGeoLocation((res) => {
      const coordinates = {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        accuracy: res.coords.accuracy
      };
      setLocation(coordinates);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If bird is found, do update
    if (bird) {
      const updateBird = {
        id: bird.id,
        name: e.target.name.value,
        notes: e.target.notes.value,
        rarity: e.target.rarity.value,
        loc: location
      };
      
      // When updating entries, go to the entry after update
      props.updateSingleBird(updateBird);
      return props.history.push(`/observation/${bird.id}`);
    }

    // Else create new bird
    const newBird = {
      name: e.target.name.value,
      notes: e.target.notes.value,
      rarity: e.target.rarity.value,
      loc: location
    };

    // When creating new entries, go to home after saving entry
    props.addBird(newBird);
    return props.history.push('/');
  };

  // On cancel go to home page
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this bird?')) {

      // If updating a single bird, return to birds entry
      if (bird) return props.history.push(`/observation/${bird.id}`);
      props.history.push('/');
    }
  };

  // Confirm user wants to update location
  const handleLocationUpdate = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to update this observations location?')){
      setGeoLocation();
    }
  };

  return (
    <div className="observationForm">
      <form onSubmit={handleSubmit}>
        <input name="name" value={name} placeholder="name" onChange={handleChange} required/>
        <select name="rarity" value={rarity} onChange={handleChange}>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="extremely rare">Extremely Rare</option>
        </select>
        <textarea name="notes" value={notes} placeholder="notes" onChange={handleChange}/>
        {location.longitude ?
          <p>latitude: {parseFloat(location.latitude).toFixed(4)} | longitude:{parseFloat(location.longitude).toFixed(4)} | accuracy: {location.accuracy}m</p>
          :
          <p>{location}</p>
        }
        <button className="button" onClick={handleLocationUpdate}>Update location</button>
        <button className="button">Save</button>
      </form>
      <button className="button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    bird: filters.filterBird(state.birds, props.match.params.id)
  };
};

export default connect(
  mapStateToProps,
  {
    addBird,
    updateSingleBird
  }
)( ObservationForm );