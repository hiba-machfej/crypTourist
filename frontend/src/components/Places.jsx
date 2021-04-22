import React from 'react';
import PropTypes from 'prop-types';
/**
 * 
 * 
description: "abc"
image: "abc"
max_owners: 10
max_radius: 4
name: "Galata Tower"
owner: "hiba.testnet"
price: "1"
total_owners: 0 

 */
export default function Places({ places }) {
  return (
    <>
      <h2>Places</h2>
      {places.map((place, i) => (
        // TODO: format as cards, add timestamp
        <p key={i} className={place.premium ? 'is-premium' : ''}>
          <strong>{place.owner}</strong>:<br />
          {place.name}
          {place.description}
          {place.max_radius}
          {place.price}
        </p>
      ))}
    </>
  );
}

Places.propTypes = {
  places: PropTypes.array,
};
