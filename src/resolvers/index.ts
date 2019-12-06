import { Resolvers } from 'schemaTypes';

// queries
import getAuthor from './getAuthor';
import getPostById from './getPostById';
import getPostsByMe from './getPostsByMe';
import getPostBySlug from './getPostBySlug';
import getPostsByTags from './getPostsByTags';
import getPostsByAuthor from './getPostsByAuthor';
import getPostsBySearch from './getPostsBySearch';

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
    postBySlug: (root, args, context) => getPostBySlug(root, args, context),
    postsByTag: (root, args, context) => getPostsByTags(root, args, context),
    postsBySearch: (root, args, context) =>
      getPostsBySearch(root, args, context)
  },
  Mutation: {
    createPost: (root, args, context) => createPost(root, args, context)
  }
};

export default resolvers;
