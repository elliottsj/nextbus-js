import fetch from 'isomorphic-fetch';
import nextbus from '..';

import agencyListXML from '../__fixtures__/agencyList';

describe('nextbus', () => {
  let nb;
  beforeEach(() => {
    nb = nextbus();
  });

  describe('getAgencies', () => {
    it('gets agencies', async () => {
      fetch.__setMockText(agencyListXML);
      const agencies = await nb.getAgencies();
      expect(agencies).toMatchSnapshot();
    });
  });
});
