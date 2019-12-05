import { Resolvers } from 'schemaTypes';

// queries
import getAuthor from './getAuthor';
import getPostsByMe from './getPostsByMe';
import getPostsByAuthor from './getPostsByAuthor';
import getPostById from './getPostById';
import getPostBySlug from './getPostBySlug';

// mutations
import createPost from './createPost';

const resolvers: Resolvers = {
  Post: {
    author: (post, args, context) => getAuthor(post, args, context)
  },
  User: {
    posts: (user, args, context) => getPostsByMe(user, args, context)
  },
  Query: {
    postsByAuthor: (root, args, context) =>
      getPostsByAuthor(root, args, context),
    postById: (root, args, context) => getPostById(root, args, context),
    postBySlug: (root, args, context) => getPostBySlug(root, args, context)
  },
  Mutation: {
    createPost: (root, args, context) => createPost(root, args, context)
  }
};

export default resolvers;
