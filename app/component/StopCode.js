import PropTypes from 'prop-types';
import React from 'react';

const StopCode = ({ code }) =>
  code && <span className="itinerary-stop-code">{code}</span>;

StopCode.displayName = 'StopCode';
StopCode.propTypes = {
  code: PropTypes.string.isRequired,
};
export default StopCode;
