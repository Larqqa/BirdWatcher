import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { ObservationForm } from './ObservationForm';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dummy from '../helpers/dummy';
import { BrowserRouter as Router } from 'react-router-dom';
import initStore from '../store';

Enzyme.configure({ adapter: new Adapter() });

describe('Observations form tests', () => {

  test('renders empty form', () => {
    const wrapper = mount(
    <Router>
      <ObservationForm
        store={initStore()}
      />
    </ Router>
    );

    // Component is found
    expect(wrapper.find(ObservationForm)
      .exists())
      .toEqual(true);

    // Component renders static element
    expect(wrapper.find(ObservationForm)
      .find('h1').text())
      .toEqual('Make new entry');
    
    expect(wrapper.find(ObservationForm)
    .find('input').first().text())
    .toEqual('');
  });

  test('renders error for wrong id', () => {
    const wrapper = mount(
    <Router>
      <ObservationForm
        store={initStore()}
        params={'notid'}
      />
    </ Router>
    );

    // Component is found
    expect(wrapper.find(ObservationForm)
      .exists())
      .toEqual(true);

    // Component renders static element
    expect(wrapper.find(ObservationForm)
      .find('#wrongId').exists())
      .toEqual(true);
  });
});
