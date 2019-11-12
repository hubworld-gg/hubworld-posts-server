import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';

import { Resolvers, ReactionType, Reactions, Reaction } from './schemaTypes';
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
      const reactionObj = postReactions
        .filter(reaction => reaction.user.id === post.author.id)
        .reduce((acc: Reactions, reaction: Reaction) => {
          const type = reaction.type;
          if (acc[type]) {
            const r = acc[type];
            r.count++;
            r.nodes = [
              ...r.nodes,
              { ...reaction, user: { ...reaction.user, __typename: 'User' } }
            ];
          } else {
            acc[type] = {
              type,
              count: 1,
              nodes: [
                { ...reaction, user: { ...reaction.user, __typename: 'User' } }
              ]
            };
          }
          return acc;
        }, {});

      const reactions = Object.keys(reactionObj).map(key => reactionObj[key]);
      return reactions;
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
  { type: ReactionType.Gamer, user: { id: 'comanderguy' } },
  { type: ReactionType.Love, user: { id: 'test-user' } },
  { type: ReactionType.Love, user: { id: 'test-user' } }
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
