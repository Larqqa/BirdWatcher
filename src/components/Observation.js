import React from 'react';
import { connect } from 'react-redux';
import { deleteBird } from '../reducers/birdReducer';
import filters from '../helpers/filters';

const Observation = (props) => {
  const bird = props.bird;

  // Delete enrty & go to home
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      props.deleteBird(bird.id);
      props.history.push('/');
    }
  };

  // Go to update form
  const handleUpdate = () => {
    props.history.push(`/observationform/${bird.id}`);
  };

  return (
    <div className="observation">
      {!bird ?
        <p>No bird by that id was found</p>
        :
        <>
          <ul>
            <li className="observation__listItem">{bird.name}</li>
            <li className="observation__listItem">
              {bird.loc.longitude ?
                `latitude: ${parseFloat(bird.loc.latitude).toFixed(4)} | longitude:${parseFloat(bird.loc.longitude).toFixed(4)} | accuracy: ${bird.loc.accuracy}m`
                :
                `${bird.loc}`
              }
            </li>
            <li className="observation__listItem">{new Date(bird.date).toString()}</li>
            <li className="observation__listItem">{bird.notes}</li>
          </ul>
          <button className="button" onClick={handleUpdate}>Update entry</button>
          <button className="button" onClick={handleDelete}>Delete entry</button>
        </>
      }
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
    deleteBird
  }
)( Observation );
