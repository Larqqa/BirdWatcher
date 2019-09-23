import React from 'react';
import { Switch, Redirect, Link, Route } from 'react-router-dom';
import About from './components/About';
import Observations from './components/Observations';
import Observation from './components/Observation';
import ObservationForm from './components/ObservationForm';
import NotFound from './components/NotFound';

// Routes are defined in this array for automated rendering
const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Observations,
    link: true
  },
  {
    name: 'About',
    path: '/about',
    exact: true,
    component: About,
    link: true
  },
  {
    name: 'Observation',
    path: '/observation/:id',
    exact: true,
    component: Observation,
    link: false
  },
  {
    name: 'Add Observation',
    path: '/observationform',
    exact: true,
    component: ObservationForm,
    link: false
  },
  {
    name: 'Update observation',
    path: '/observationform/:id',
    exact: true,
    component: ObservationForm,
    link: false
  },
  {
    name: '404 not found',
    path: '/404',
    component: NotFound,
    link: false
  }
];

// Make links for use in navBar
export const NavLinks = () => {
  return (
    <div id="nav">
      {routes.map((route, i) =>
        route.link &&
        <Link
          key={i}
          className="nav__item"
          to={route.path}
        >{route.name}</Link>
      )}
    </div>
  );
};

// Define Routing
const Routes = () => {
  return (
    <Switch>
      {routes.map((route, i) =>
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      )}
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;