// @flow

import fetch, { __setMockText as setFetchMockText } from 'isomorphic-fetch';
import nextbus from '..';

import agencyListXML from '../__fixtures__/agencyList';
import routeConfigXML from '../__fixtures__/routeConfig';
import routeListXML from '../__fixtures__/routeList';

describe('nextbus', () => {
  let nb;
  const onRequest = jest.fn();
  beforeEach(() => {
    nb = nextbus({ onRequest });
    fetch.mockClear();
  });

  describe('getAgencies', () => {
    it('gets agencies', async () => {
      setFetchMockText(agencyListXML);
      const agencies = await nb.getAgencies();
      expect(onRequest).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList');
      expect(fetch).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList');
      expect(agencies).toMatchSnapshot();
    });
  });

  describe('getRoute', () => {
    it('gets a route config', async () => {
      setFetchMockText(routeConfigXML);
      const routes = await nb.getRoute('ttc', '506');
      expect(onRequest).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=506');
      expect(fetch).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=506');
      expect(routes).toMatchSnapshot();
    });
  });

  describe('getRoutes', () => {
    it('gets routes', async () => {
      setFetchMockText(routeListXML);
      const routes = await nb.getRoutes('ttc');
      expect(onRequest).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc');
      expect(fetch).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc');
      expect(routes).toMatchSnapshot();
    });
  });
});
