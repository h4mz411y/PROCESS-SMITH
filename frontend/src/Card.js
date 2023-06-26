import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ name, status }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Status: {status}</p>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Card;