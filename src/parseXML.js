// @flow

import pify from 'pify';
import { parseString } from 'xml2js';

const parseXML: (xml: string) => Promise<Object> = pify((xml, cb) => {
  parseString(xml, {}, cb);
});

export default parseXML;
