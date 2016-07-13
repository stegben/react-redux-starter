import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Landing from '../Landing';
import configStore from '../../store';
import LoginForm from '../../containers/LoginForm';

const setup = () => {
  const store = configStore();
  const component = mount(
    <Provider store={store}>
      <Landing />
    </Provider>
  );
  return {
    component,
  };
};

describe('page: Landing', () => {
  it('should contain component LoginForm', () => {
    const { component } = setup();
    expect(component).to.contain(<LoginForm />);
  });
});
