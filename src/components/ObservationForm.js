import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addBird, updateSingleBird } from '../reducers/birdReducer';
import filters from '../helpers/filters';
import animate from '../helpers/animations';

const ObservationForm = (props) => {
  const [ name, setName ] = useState('');
  const [ rarity, setRarity ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ location, setLocation ] = useState('No location given');
  const [ alt, setAlt ] = useState('');
  const [ picture, setPicture ] = useState();

  const bird = props.bird;

  // Init form values, if prop was found
  useEffect(() => {
    
    if (bird) {
      setName(bird.name);
      setRarity(bird.rarity);
      setNotes(bird.notes);
      setLocation(bird.loc);
      setPicture(bird.picture);
      setAlt(bird.alt);
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
    case 'alt':
      setAlt(e.target.value);
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
      animate.message('error', `Error: ${err.message}`);
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

  // Get picture as binary string
  const toBlob = (bird, callback) => {

    // Get picture from input
    const file = document.getElementById('picture').files[0];

    // If no picture, return rest of the bird object
    if (!file) return callback(bird);

    var reader = new FileReader();
    
    reader.onload = () => {

      // Add binary to object
      bird.picture = reader.result;
      callback(bird);
    };
    
    reader.readAsBinaryString(file);

    return callback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If bird is found, do update
    if (bird) {
      const updateBird = {
        id: bird.id,
        name: e.target.name.value,
        notes: e.target.notes.value,
        rarity: e.target.rarity.value,
        loc: location,
        picture: picture,
        alt: alt
      };

      return toBlob(updateBird, (res) => {

        // When updating entries, go to the entry after update
        props.updateSingleBird(res);
        animate.message('success', `${res.name} was updated`);
        return props.history.push(`/observation/${bird.id}`);
      });

    }

    // Else create new bird
    const newBird = {
      name: e.target.name.value,
      notes: e.target.notes.value,
      rarity: e.target.rarity.value,
      loc: location,
      alt: alt
    };

    toBlob(newBird, (res) => {

      // When creating new entries, go to home after saving entry
      props.addBird(res);
      animate.message('success', `${res.name} was added`);
      return props.history.push('/');
    });
    
  };

  // On cancel go to home page
  const handleCancel = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to cancel?')) {

      // If updating a single bird, return to birds entry
      if (bird) return props.history.push(`/observation/${bird.id}`);
      props.history.push('/');
    }
  };

  // Confirm user wants to update location
  const handleLocationUpdate = (e) => {
    e.preventDefault();

    // Confirm that user wants to overwrite old location
    if (bird && !window.confirm('Are you sure you want to update this observations location?')) {
      return;
    }
    
    // When creating new entries, get location on button press
    setGeoLocation();
    animate.message('success', 'Location updated');
  };

  return (
    <div className="main observationForm">
      <h1>{!bird ? 'Make new entry' : `update ${bird.name}`}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" aria-label="Add name of the bird" value={name} placeholder="Name" onChange={handleChange} required/>
        <select name="rarity" aria-label="Select rarity" value={rarity} onChange={handleChange}>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="extremely rare">Extremely Rare</option>
        </select>
        <textarea type="text" name="notes" aria-label="Add notes" rows="5" value={notes} placeholder="Notes" onChange={handleChange}/>
        {location.longitude ?
          <p>
            {`latitude: ${parseFloat(location.latitude).toFixed(4)}`}
            <br/>
            {`longitude: ${parseFloat(location.longitude).toFixed(4)}`}
            <br/>
            {`accuracy: ${location.accuracy}m`}
          </p>
          :
          <p>{location}</p>
        }
        <button className="button--space" onClick={handleLocationUpdate}>
          {!bird ?
            'Add location'
            :
            'Update location'
          }
        </button>
        <p>{!bird || !bird.picture ? 'Add picture' : 'Replace picture'}</p>
        <input type="file" name="picture" aria-label="Add a picture" id="picture" capture />
        <input type="text" name="alt" aria-label="Add an alternative tag for the picture" value={alt} placeholder="Alternate text for image" onChange={handleChange} />
        <button className="button">Save</button>
        <button className="button" onClick={handleCancel}>Cancel</button>
      </form>
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