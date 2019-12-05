import { MutationCreatePostArgs, CreatePostPayload } from 'schemaTypes';
import { slugify, generateHash, formatTags } from 'utils';
import getPostById from './getPostById';

const createPost = async (
  root: any,
  args: MutationCreatePostArgs,
  context: AppGraphQLContext
): Promise<CreatePostPayload> => {
  const { post } = args.input;
  const { firestoreClient } = context;

  const slug = `${slugify(post.title)}-${generateHash()}`;

  const addPostRef = await firestoreClient.collection('posts').add({
    slug,
    authorId: post.authorId,
    title: post.title,
    content: post.content,
    tags: post.tags ?? []
  });

  const createdPost = await getPostById({}, { id: addPostRef.id }, context);

  if (!createdPost) return { post: null };

  const createPostPayload: CreatePostPayload = {
    post: {
      author: {
        id: createdPost.author.id,
        posts: []
      },
      id: createdPost.id,
      title: createdPost.title,
      slug: createdPost.slug,
      content: createdPost.content,
      reactions: createdPost.reactions,
      tags: createdPost.tags
    }
  };

  return createPostPayload;
};

export default createPost;
