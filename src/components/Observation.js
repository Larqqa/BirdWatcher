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
    <div className="main observation">
      {!bird ?
        <h1>No bird by that id was found</h1>
        :
        <>
          <h1>{bird.name}</h1>
          <ul className="observation__list">
            <li className="observation__listItem">
              <p>Rarity:</p>
              {bird.rarity}
            </li>
            <li className="observation__listItem">
              {bird.loc.longitude ?
                <>
                  <p>Location:</p>
                  {`latitude: ${parseFloat(bird.loc.latitude).toFixed(4)}`}
                  <br/>
                  {`longitude: ${parseFloat(bird.loc.longitude).toFixed(4)}`}
                  <br/>
                  {`accuracy: ${bird.loc.accuracy}m`}
                </>
                :
                `${bird.loc}`
              }
            </li>
            <li className="observation__listItem">
              <p>Date:</p>
              {new Date(bird.date).toLocaleString('en-GB', { timeZone: 'Europe/Helsinki' })}
            </li>
            {bird.notes ?
              <li className="observation__listItem">
                <p>Notes:</p>
                {bird.notes}
              </li>
              :
              <li className="observation__listItem"><p>No notes</p></li>
            }
            {bird.picture &&
            <li className="observation__listItem">
              <img alt={bird.alt || 'no alt given'} src={`data:image/jpg;image/png;base64, ${btoa(bird.picture)}`} />
            </li>
            }
          </ul>
          <div className="observation__listItem__buttons">
            <button className="button" onClick={handleUpdate}>Update entry</button>
            <button className="button" onClick={handleDelete}>Delete entry</button>
          </div>
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
