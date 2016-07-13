import React, { PropTypes } from 'react';


const App = ({ children }) => (
  <div>
    <div>App</div>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
