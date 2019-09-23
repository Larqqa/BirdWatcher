import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateBirds } from '../reducers/birdReducer';
import filters from '../helpers/filters';

const Observations = (props) => {
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
    <div className="observations">
      <button className="button" onClick={handleAddNewObservation}>Add new Observation</button>
      <form onChange={handleFiltering} className="observations__filter">
        <p>Sorting:</p>
        <select>
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
            <ul key={bird.id} className="observations__list">
              <li className="observations__listItem--title">{bird.name}</li>
              <li className="observations__listItem">{bird.rarity}</li>
              <li className="observations__listItem">
                {bird.loc.longitude ?
                  `latitude: ${parseFloat(bird.loc.latitude).toFixed(4)} | longitude:${parseFloat(bird.loc.longitude).toFixed(4)} | accuracy: ${bird.loc.accuracy}m`
                  :
                  `${bird.loc}`
                }
              </li>
              <li className="observations__listItem">{new Date(bird.date).toString()}</li>
              <li className="observations__listItem">{bird.notes.substring(0,30)}</li>
              <Link to={`/observation/${bird.id}`}>
                <button className="observations__button button">Open</button>
              </Link>
            </ul>
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