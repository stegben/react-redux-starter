import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginStart } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(loginStart({ email, password })),
});

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onClickLogin = () => {
    const { email, password } = this.state;
    this.props.login({ email, password });
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input
          placeholder="email"
          onChange={this.handleEmailChange}
          value={email}
        />
        <input
          placeholder="password"
          onChange={this.handlePasswordChange}
          value={password}
        />
        <button onClick={this.onClickLogin}>Login</button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(LoginForm);
