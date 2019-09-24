import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Observations from './Observations';
import storeInit from '../store';

const store = storeInit();

test('renders content', () => {

  const component = render(
    <Provider store={ store }>
      <Observations />
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'BirdWatcher'
  );
});