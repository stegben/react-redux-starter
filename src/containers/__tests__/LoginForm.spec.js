import { expect } from 'chai';
import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import { LoginForm } from '../LoginForm';

const fakeLogin = spy();

const setup = () => {
  const component = shallow(
    <LoginForm login={fakeLogin} />
  );
  return {
    component,
  };
};

describe('container: LoginForm', () => {
  it('should contain two input', () => {
    const { component } = setup();
    expect(component.find('input')).to.have.length(2);
  });

  it('should contain one button', () => {
    const { component } = setup();
    expect(component.find('input')).to.have.length(2);
  });
});
