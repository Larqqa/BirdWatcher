import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateBirds } from '../reducers/birdReducer';
import filters from '../helpers/filters';

export const Observations = (props) => {
  const birds = props.birds;
  
  const handleSort = (filter) => {
    const sortedBirds = [ ...birds ].sort(filter);
    props.updateBirds(sortedBirds);
  };

  const handleFiltering = (e) => {
    e.preventDefault();

    switch (e.target.value) {
    case 'dateDesc':
      handleSort(filters.sortDateDesc);
      break;
    case 'dateAsc':
      handleSort(filters.sortDateAsc);
      break;
    case 'rarityDesc':
      handleSort(filters.sortRarityDesc);
      break;
    case 'rarityAsc':
      handleSort(filters.sortRarityAsc);
      break;
    case 'alphaDesc':
      handleSort(filters.sortAlphabetic);
      break;
    case 'alphaAsc':
      handleSort(filters.sortAlphabeticReversed);
      break;
    default:
      return;
    }
  };

  const handleAddNewObservation = () => {
    return props.history.push('/observationform');
  };

  return (
    <div className="main observations">
      <h1>BirdWatcher</h1>
      <button className="button--full" onClick={handleAddNewObservation}>Add new Observation</button>
      <form onChange={handleFiltering} className="observations__filter">
        <p>Sorting:</p>
        <select aria-label="Select sorting">
          <option value="dateDesc">Descending by date</option>
          <option value="dateAsc">Ascending by date</option>
          <option value="rarityDesc">Descending by rarity</option>
          <option value="rarityAsc">Ascending by rarity</option>
          <option value="alphaDesc">Alphabetical</option>
          <option value="alphaAsc">Reversed alphabetical</option>
        </select>
      </form>

      {birds && birds.map(
        bird => {
          return(
            <React.Fragment key={bird.id}>
              <hr />
              <ul className="observations__list">
                <li className="observations__listItem--title">
                  <p>{bird.name}</p>
                </li>
                <li className="observations__listItem">
                  <p>Rarity:</p>
                  {bird.rarity}
                </li>
                <li className="observations__listItem">
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
                <li className="observations__listItem">
                  <p>Date:</p>
                  {new Date(bird.date).toLocaleString('en-GB', { timeZone: 'Europe/Helsinki' })}</li>
                {bird.notes &&
                  <li className="observations__listItem">
                    <p>Notes:</p>
                    {bird.notes.substring(0,30)}
                  </li>
                }
                {bird.picture &&
                <li className="observations__listItem">
                  <img alt={bird.alt || 'no alt given'} src={`data:image/jpg;image/png;base64, ${btoa(bird.picture)}`} />
                </li>
                }
                <li className="observations__listItem"><Link to={`/observation/${bird.id}`}>
                  <button className="observations__button button">Open</button>
                </Link></li>
              </ul>
            </React.Fragment>
          );
        }
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    birds: state.birds
  };
};

export default connect(
  mapStateToProps,
  { updateBirds }
)( Observations );