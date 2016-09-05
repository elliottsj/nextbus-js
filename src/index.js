// @flow

import fetch from 'isomorphic-fetch';
import url from 'url';
import parseXML from './parseXML';

export type Agency = {
  regionTitle: string,
  shortTitle?: string,
  tag: string,
  title: string,
};

/**
 * Fetch from the NextBus XML Feed using the given command, host, protocol, and query parameters,
 * and parse the resulting XML.
 */
type FetchNextBusXMLOptions = {
  command: string,
  host?: string,
  protocol?: string,
  query?: { [key: string]: string },
};
async function fetchNextBusXML(
  { command, host, protocol, query }: FetchNextBusXMLOptions
) {
  const response = await fetch(url.format({
    host,
    protocol,
    pathname: '/service/publicXMLFeed',
    query: { command, ...query },
  }));
  return await parseXML(await response.text());
}

/**
 * Create a NextBus API object which will connect to the NextBus XML Feed served on the given
 * host and port, defaulting to the publicly-hosted instance at http://webservices.nextbus.com
 */
type NextBusOptions = {
  host?: string,
  protocol?: string,
};
type NextBusAPI = {
  getAgencies(): Promise<Agency[]>
};
export default function nextbus({
  host = 'webservices.nextbus.com',
  protocol = 'http:',
}: NextBusOptions = {}): NextBusAPI {
  return {
    async getAgencies() {
      const xml = await fetchNextBusXML({
        command: 'agencyList',
        host,
        protocol,
      });
      return xml.body.agency.map(node => node.$);
    },
  };
}
