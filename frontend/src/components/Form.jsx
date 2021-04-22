import React from 'react';
import PropTypes from 'prop-types';

export default function Form({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the CrypTourist, {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="name">Name:</label>
          <input autoComplete="off" autoFocus id="name" required />
          <label htmlFor="name">Description:</label>
          <input autoComplete="off" autoFocus id="description" required />
          <label htmlFor="name">Image:</label>
          <input autoComplete="off" autoFocus id="image" required />
          <label htmlFor="name">Radius:</label>
          <input autoComplete="off" autoFocus id="max_radius" required />
        </p>
        {/* <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p> */}
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
