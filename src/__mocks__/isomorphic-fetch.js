// @flow

let mockText = '';

async function fetch() {
  return await {
    async text() {
      return mockText;
    },
  };
}

fetch.__setMockText = (text) => {
  mockText = text;
};

export default fetch;
