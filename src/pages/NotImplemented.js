import React, { PropTypes } from 'react';

const NotImplemented = ({ params }) => (
  <div>Not Implemented, but it get params: {JSON.stringify(params)}</div>
);

NotImplemented.propTypes = {
  params: PropTypes.object,
};

export default NotImplemented;
