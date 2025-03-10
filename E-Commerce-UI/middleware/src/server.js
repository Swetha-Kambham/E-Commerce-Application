import { ApolloServer } from 'apollo-server';
import schema from './modules/schema';
import { dataSource } from './data-source';

const server = new ApolloServer({
  ...schema,
  debug: false,
  context: ({ req }) => ({
    dataSource: (() => {
      Object.keys(dataSource).forEach((ds) => {
        dataSource[ds].initialize(req);
      });

      return dataSource;
    })(),
    headers: req.headers
  })
});

const startServer = () => {
  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}`);
  });
};

export default startServer;
