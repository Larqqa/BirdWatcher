import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ObservationForm from './ObservationForm';
import storeInit from '../store';

const store = storeInit();

test('renders content', () => {

  const component = render(
    <Provider store={ store }>
      <ObservationForm match={{ params: { id: null } }}/>
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'Make new entry'
  );
});