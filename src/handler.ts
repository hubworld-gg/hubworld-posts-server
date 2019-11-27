import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';

import { Resolvers, Reaction, Post } from './schemaTypes';
import typeDefs from './schema.graphql';

export interface AppGraphQLContext {
  userID: String;
}

const resolvers: Resolvers = {
  Post: {
    author(post) {
      return { __typename: 'User', id: post.author.id, posts: [] };
    },
    reactions(post) {
      return postReactions.filter(
        reaction => reaction.user.id === post.author.id
      );
    }
  },
  User: {
    posts(user) {
      return posts.filter((post: Post) => post.author.id === user.id);
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
  debug: process.env.APP_ENV === 'prod' ? false : true,
  context: ({ event }): AppGraphQLContext => {
    const userID = event.headers?.['user-id'];
    return { userID };
  }
});

const posts: any = [
  {
    id: '1001',
    author: { id: 'test-user' },
    content: 'Hey thereeee',
    tags: ['gamer', 'reviews', 'tgif']
  }
];

const postReactions: Reaction[] = [
  { type: '🕹', user: { id: 'comanderguy', posts: [] } },
  { type: '❤', user: { id: 'test-user', posts: [] } },
  { type: '❤', user: { id: 'test-user', posts: [] } }
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
