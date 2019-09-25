import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Observations } from './Observations';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import initStore from '../store';
import dummy from '../helpers/dummy';
import { addBird } from '../reducers/birdReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import filters from '../helpers/filters';
import db from '../services/DB';

Enzyme.configure({ adapter: new Adapter() });

describe('Observation tests', () => {
  let wrapper;
  let store;

  beforeEach(async () => {

    // Data is initialized through the Redux store and reducer
    // But passed to the component as a prop
    // I Couldn't get prop data from component otherwise for testing
    store = initStore();
    await Promise.all(
      dummy.map(dum => store.dispatch(addBird(dum)))
    );

    wrapper = mount(
    <Router>
      <Observations
        store={store}
        birds={store.getState().birds}
      />
    </ Router>
    );
  });

  // Clear db of olf data after test
  afterEach(() => {
    db.entries.clear();
  })

  test('Component renders content', () => {
    
    // Component is found
    expect(wrapper.find(Observations)
      .exists())
      .toEqual(true);

    // Component renders static element
    expect(wrapper.find(Observations)
      .find('h1').text())
      .toEqual('BirdWatcher');

    // Component renders elements from props
    expect(wrapper.find(Observations)
      .find('.observations__list').exists())
      .toEqual(true);
    
    // prop list is of correct length
    expect(wrapper.find(Observations)
      .find('.observations__list').length)
      .toBe(dummy.length);
    
    // Lists have correct data
    expect(wrapper.find(Observations)
      .find('.observations__listItem').exists())
      .toEqual(true);
  });

  test('Observation list is by default ordered by timestamp', () => {
    const list = dummy.sort(filters.sortDateDesc);

    expect(wrapper.find(Observations)
      .find('.observations__list').first().find('.observations__listItem--title').text())
      .toBe(list[0].name);
  });
});
