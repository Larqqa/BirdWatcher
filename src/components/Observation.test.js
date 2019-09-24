import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Observation from './Observation';
import storeInit from '../store';

const store = storeInit();

test('renders content', () => {

  const component = render(
    <Provider store={ store }>
      <Observation match={{ params: { id:  null } }} />
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'No bird by that id'
  );
});