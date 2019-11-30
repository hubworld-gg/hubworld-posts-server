import AWS from 'aws-sdk';

import { Resolvers, Post, User } from './schemaTypes';
import { promisify } from './utils';

const docClient = new AWS.DynamoDB.DocumentClient();

const resolvers: Resolvers = {
  Post: {
    author: (post, args) => getAuthor(post, args)
  },
  User: {
    posts: (user, args) => getPosts(user, args)
  }
};

const getAuthor = (post: Post, args: {}): User => {
  return { __typename: 'User', id: post.author.id, posts: [] };
};

const getPosts = async (user: User, args: {}): Promise<Post[]> => {
  const posts: Post[] = await promisify((callback: any) => {
    const params = {
      TableName: 'HubworldPosts',
      KeyConditionExpression: 'authorId = :v1',
      ExpressionAttributeValues: {
        ':v1': user.id
      }
    };

    docClient.query(params, callback);
  }).then((result: any) => {
    const postResult: PostsDBType = result.Items ?? [];
    const posts: Post[] = postResult.map(p => {
      const post: Post = {
        author: {
          id: p.authorId,
          posts: []
        },
        id: p.postId,
        reactions: p.reactions.map(r => ({
          type: r.type,
          user: {
            id: r.userId,
            posts: []
          }
        })),
        tags: p.tags.values,
        content: p.content
      };
      return post;
    });
    return posts;
  });
  return posts;
};

export default resolvers;
