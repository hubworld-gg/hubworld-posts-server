import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './schema.graphql';

const resolvers = {
  Post: {
    author(post: any) {
      return { __typename: 'User', id: post.authorId };
    }
  },
  User: {
    posts(user: any) {
      return posts.filter(post => post.authorId === user.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  debug: process.env.APP_ENV === 'prod' ? false : true
  // context: ({ event }) => {
  //   const userID = event.headers ? event.headers['user-id'] : undefined;
  //   return { userID };
  // }
});

const posts = [
  {
    id: '1001',
    authorId: '1',
    content: 'Hey thereeee'
  }
];

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  server.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true
    }
  })(event, context, (err: any, data: any) => {
    callback(null, data);
  });
};
