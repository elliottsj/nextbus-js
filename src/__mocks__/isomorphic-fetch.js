// @flow

let mockText = '';

const fetch = jest.fn(() => Promise.resolve({
  async text() {
    return mockText;
  },
}));

export function __setMockText(text: string) {
  mockText = text;
}

export default fetch;
