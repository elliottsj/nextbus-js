// @flow

import fetchNextBusXML from './fetchNextBusXML';

export type Agency = {
  regionTitle: string,
  shortTitle?: string,
  tag: string,
  title: string,
};

type NextBusOptions = {
  host?: string,
  protocol?: string,
};

export default function nextbus({
  host = 'webservices.nextbus.com',
  protocol = 'http:',
}: NextBusOptions = {}) {
  return {
    async getAgencies(): Promise<Agency[]> {
      const xml = await fetchNextBusXML({
        command: 'agencyList',
        host,
        protocol,
      });
      return xml.body.agency.map(node => node.$);
    },
  };
}
