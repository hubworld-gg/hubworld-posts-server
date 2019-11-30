import { Post, User } from 'schemaTypes';

const getAuthor = (post: Post, args: {}, context: AppGraphQLContext): User => {
  return { __typename: 'User', id: post.author.id, posts: [] };
};

export default getAuthor;
