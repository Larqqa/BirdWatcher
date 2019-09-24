import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import About from './About'
import { BrowserRouter } from 'react-router-dom';

test('renders content', () => {

  // Init router
  const router = {
    history: new BrowserRouter().history,
    route: {
      location: {},
      match: {},
    },

  };
  const component = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );

  expect(component.container).toHaveTextContent(
    'About BirdWatcher'
  );
});