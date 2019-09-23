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
        <h1>No bird by that id was found</h1>
        :
        <>
          <h1>{bird.name}</h1>
          <ul>
            <li className="observation__listItem">
              {bird.loc.longitude ?
                `latitude: ${parseFloat(bird.loc.latitude).toFixed(4)} | longitude:${parseFloat(bird.loc.longitude).toFixed(4)} | accuracy: ${bird.loc.accuracy}m`
                :
                `${bird.loc}`
              }
            </li>
            <li className="observation__listItem">{new Date(bird.date).toString()}</li>
            {bird.notes ?
              <li className="observation__listItem">{bird.notes}</li>
              :
              <li className="observation_listItem">No notes</li>
            }
            {bird.picture &&
            <li>
              <img alt={bird.alt || 'no alt given'} src={`data:image/jpg;image/png;base64, ${btoa(bird.picture)}`} />
            </li>
            }
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
