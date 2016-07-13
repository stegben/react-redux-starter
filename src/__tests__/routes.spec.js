import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Router, createMemoryHistory, useRouterHistory } from 'react-router';

import createRoutes from '../routes';
import {
  NotFound,
} from '../pages';

const createStubStore = (authenticated) => ({
  getState() {
    return {
      auth: {
        authenticated,
      },
    };
  },
});

const renderRoute = (path, authenticated = false) => {
  const history = useRouterHistory(createMemoryHistory)({ queryKey: false });
  history.push(path);
  const store = createStubStore(authenticated);
  const routes = createRoutes(store);
  const router = shallow(<Router history={history} routes={routes} />);
  return router.renderer.getRenderOutput().props;
};

const expectIncludeComponents = (components, expectedComponents) => {
  expectedComponents.forEach(comp => {
    expect(components).to.include(comp);
  });
};

describe('routes: ', () => {
  describe('redirect to / if not logged in', () => {
    it('/app', () => {
      const { location } = renderRoute('/app');
      expect(location.pathname).to.equal('/');
    });
  });

  it('does not match any route should render NotFoundPage', () => {
    const { components } = renderRoute('/page-not-found');
    expectIncludeComponents(components, [NotFound]);
  });
});
