// @flow

import fetch from 'isomorphic-fetch';
import url from 'url';
import parseXML from './parseXML';

type FetchNextBusXMLOptions = {
  command: string,
  host?: string,
  protocol?: string,
  query?: { [key: string]: string },
};

export default async function fetchNextBusXML(
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
