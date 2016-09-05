// @flow

let mockText = '';

const fetch = jest.fn(async () => Promise.resolve({
  async text() {
    return mockText;
  },
}));

// $FlowIgnore
fetch.__setMockText = (text) => {
  mockText = text;
};

export default fetch;
