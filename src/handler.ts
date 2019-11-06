import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './schema.graphql';
// import { Post, Reactions, ReactionType } from './types';

export interface AppGraphQLContext {
  userID: String;
}

const resolvers = {
  Post: {
    author(post: any) {
      return { __typename: 'User', id: post.authorID };
    },
    reactions(post: any) {
      const reactionObj = post.reactions.reduce(
        (acc: object, reaction: any) => {
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
        },
        {}
      );

      const reactions = Object.keys(reactionObj).map(key => reactionObj[key]);
      return reactions;
    }
  },
  User: {
    posts(user: any) {
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
    const userID = event.headers ? event.headers['user-id'] : undefined;
    return { userID };
  }
});

const posts = [
  {
    id: '1001',
    author: { id: 'test-user' },
    content: 'Hey thereeee',
    tags: ['gamer', 'reviews', 'tgif'],
    reactions: [
      { id: '999', type: 'LOVE', user: { id: 'comanderguy' } },
      { id: '9993', type: 'LOVE', user: { id: 'test-user' } },
      { id: '493', type: 'GAMER', user: { id: 'test-user' } }
    ]
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
