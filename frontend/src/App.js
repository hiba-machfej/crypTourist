// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to CrypTourist</h1>
//     </div>
//   );
// }

// export default App;

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Places from './components/Places';
import Form from './components/Form';
import SignIn from './components/SignIn';

// const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getPlaces().then(setPlaces);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      fieldset,
      name,
      description,
      image,
      max_radius,
    } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .addPlace(
        {
          name: name.value,
          description: description.value,
          image: image.value,
          max_radius: parseInt(max_radius.value),
        },

        BOATLOAD_OF_GAS
        // Big(donation.value || '0')
        //   .times(10 ** 24)
        //   .toFixed()
      )
      .then(() => {
        contract.getPlaces().then((places) => {
          console.log(`places${places}`);
          setPlaces(places);
          name.value = '';
          description.value = '';
          image.value = '';
          max_radius.value = '';
          // donation.value = SUGGESTED_DONATION;

          fieldset.disabled = false;
          name.focus();
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, 'CrypTourist');
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>Welcome to CrypTourist</h1>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <Form onSubmit={onSubmit} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!places.length && <Places places={places} />}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addPlace: PropTypes.func.isRequired,
    getPlaces: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
