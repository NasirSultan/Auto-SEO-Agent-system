const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
  apiKey: 'pcsk_6fyasn_9dtNYyaySJX6DHY3z79pkgUkdid5TQrzKvjNeZFcTXeCdfmCLmNKNNzYHM8Z36H'
});

const index = pc.index(
  'testing',
  'https://testing-io05foq.svc.aped-4627-b74a.pinecone.io'
);

module.exports = { index };
