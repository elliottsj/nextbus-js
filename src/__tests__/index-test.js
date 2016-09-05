import fetch from 'isomorphic-fetch';
import nextbus from '..';

import agencyListXML from '../__fixtures__/agencyList';
import routeListXML from '../__fixtures__/routeList';

describe('nextbus', () => {
  let nb;
  beforeEach(() => {
    nb = nextbus();
    fetch.mockClear();
  });

  describe('getAgencies', () => {
    it('gets agencies', async () => {
      fetch.__setMockText(agencyListXML);
      const agencies = await nb.getAgencies();
      expect(fetch).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList');
      expect(agencies).toMatchSnapshot();
    });
  });

  describe('getRoutes', () => {
    it('gets routes', async () => {
      fetch.__setMockText(routeListXML);
      const routes = await nb.getRoutes('ttc');
      expect(fetch).lastCalledWith('http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc');
      expect(routes).toMatchSnapshot();
    });
  });
});
