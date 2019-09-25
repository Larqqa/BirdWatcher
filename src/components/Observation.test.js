import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Observation } from './Observation';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import initStore from '../store';
import dummy from '../helpers/dummy';
import filters from '../helpers/filters';
import db from '../services/DB';

Enzyme.configure({ adapter: new Adapter() });

describe('Observation tests', () => {
  test('Component renders error message with wrong id', () => {
    const wrapper = mount(
      <Observation
        store={initStore()}
      />
    );
    
    // Component is founc
    expect(wrapper.find(Observation)
      .exists())
      .toEqual(true);

    // Component renders static element
    expect(wrapper.find(Observation)
      .find('h1').text())
      .toEqual('No bird by that id was found');
  });

  test('Component renders data', () => {
    const wrapper = mount(
      <Observation
        store={initStore()}
        bird={dummy[0]}
      />
    );
    
    // Component is found
    expect(wrapper.find(Observation)
      .exists())
      .toEqual(true);

    // Component renders title
    expect(wrapper.find(Observation)
      .find('h1').text())
      .toEqual(dummy[0].name);
  });
});
