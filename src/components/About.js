import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="main about">
      <h1>About BirdWatcher</h1>
      <p>
        This application was build to help track bird watching observations. You can save your obsercations online and offline. New observations can be saved by filling the <Link to="/observationform">observation form</Link>.
      </p>
      <p>
        The form allows you to save the name of the bird, some notes, the location, time and date, an image, and rarity from a predefined list: common, rare, and extremely rare. All data from old observations can be updated, if for example some key note was missed when saving.
      </p>
      <p>
        Observations can be found on the home page, and can be sorted by date, rarity, and name.
      </p>
    </div>
  );
};

export default About;