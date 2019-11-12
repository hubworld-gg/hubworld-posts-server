import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';

import { Resolvers, Reactions, Reaction } from './schemaTypes';
import typeDefs from './schema.graphql';

export interface AppGraphQLContext {
  userID: String;
}

const resolvers: Resolvers = {
  Post: {
    author(post) {
      return { __typename: 'User', id: post.author.id };
    },
    reactions(post) {
      return Object.values(
        postReactions
          .filter(reaction => reaction.user.id === post.author.id)
          .reduce((acc, reaction: Reaction) => {
            const { type } = reaction;
            let reacts: Reactions = {
              count: 1,
              type,
              nodes: [
                { ...reaction, user: { ...reaction.user, __typename: 'User' } }
              ]
            };

            if (acc[type]) {
              reacts = acc[type];
              reacts.count++;
              reacts.nodes = [
                ...reacts.nodes,
                { ...reaction, user: { ...reaction.user, __typename: 'User' } }
              ];
            }

            acc[type] = reacts;
            return acc;
          }, {})
      );
    }
  },
  User: {
    posts(user) {
      return posts.filter(post => post.author.id === user.id);
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

const posts = [
  {
    id: '1001',
    author: { id: 'test-user' },
    content: 'Hey thereeee',
    tags: ['gamer', 'reviews', 'tgif']
  }
];

const postReactions: Reaction[] = [
  { type: '🕹', user: { id: 'comanderguy' } },
  { type: '❤', user: { id: 'test-user' } },
  { type: '❤', user: { id: 'test-user' } }
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
