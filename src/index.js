// @flow

import fetch from 'isomorphic-fetch';
import url from 'url';
import parseXML from './parseXML';

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
    async getRoute(
      agencyTag: string,
      routeTag: string,
      includeNonUIDirections: boolean = false,
      includePaths: boolean = true,
    ): Promise<RouteConfig> {
      const xml = await fetchNextBusXML({
        command: 'routeConfig',
        host,
        protocol,
        query: {
          a: agencyTag,
          r: routeTag,
          ...(includeNonUIDirections ? { verbose: '' } : {}),
          ...(!includePaths ? { terse: '' } : {}),
        },
      });
      const stops = xml.body.route[0].stop.map(stop => ({
        ...stop.$,
        lat: Number.parseFloat(stop.$.lat),
        lon: Number.parseFloat(stop.$.lon),
      }));
      return {
        ...xml.body.route[0].$,
        latMax: Number.parseFloat(xml.body.route[0].$.latMax),
        latMin: Number.parseFloat(xml.body.route[0].$.latMin),
        lonMax: Number.parseFloat(xml.body.route[0].$.lonMax),
        lonMin: Number.parseFloat(xml.body.route[0].$.lonMin),
        directions: xml.body.route[0].direction.map(direction => ({
          ...direction.$,
          useForUI: direction.$.useForUI === 'true',
          stops: direction.stop.map(
            dirStop => stops.find(stop => stop.tag === dirStop.$.tag)
          ),
        })),
        paths: xml.body.route[0].path.map(
          pth => pth.point.map(
            point => ({
              lat: Number.parseFloat(point.$.lat),
              lon: Number.parseFloat(point.$.lon),
            })
          )
        ),
        stops,
      };
    },
    async getRoutes(agencyTag: string): Promise<Route[]> {
      const xml = await fetchNextBusXML({
        command: 'routeList',
        host,
        protocol,
        query: { a: agencyTag },
      });
      return xml.body.route.map(node => node.$);
    },
  };
}
