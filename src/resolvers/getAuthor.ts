import { Post, User } from 'schemaTypes';

const getAuthor = (post: Post, args: {}, context: AppGraphQLContext): User => {
  return { id: post.author.id };
};

export default getAuthor;
