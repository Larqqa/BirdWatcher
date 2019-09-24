import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Routes, { NavLinks } from './Routes';
import { initializeBirds, addBird } from './reducers/birdReducer';
import dummy from './helpers/dummy';

const App = (props) => {

  // Initialize local data
  useEffect(() => {
    const init = async () => {

      // Add dummy data
      await dummy.map(bird => {
        props.addBird(bird);
      });

      props.initializeBirds();
    };

    init();
  }, []);

  return (
    <>
      <div id="messageBox" />
      <header>
        <NavLinks />
      </header>

      <Routes />
    </>
  );
};

export default connect(
  null,
  {
    initializeBirds,
    addBird
  }
)( App );