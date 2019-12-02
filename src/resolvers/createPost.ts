import { MutationCreatePostArgs, CreatePostPayload } from 'schemaTypes';
import { promisify } from 'utils';
import getPostById from './getPostById';

const createPost = async (
  root: any,
  args: MutationCreatePostArgs,
  context: AppGraphQLContext
): Promise<CreatePostPayload> => {
  const { post } = args.input;
  const { docClient } = context;

  const postId = 'generatedID';

  const createPostPayload: CreatePostPayload = await promisify(
    (callback: any) => {
      const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: 'HubworldPosts',
        Item: {
          postId,
          authorId: post.authorId,
          title: post.title,
          content: post.content,
          tags: post.tags ? docClient.createSet(post.tags) : null
        }
      };
      return docClient.put(params, callback);
    }
  ).then(async () => {
    const post = await getPostById({}, { id: postId }, context);

    if (!post) return { post: null };

    const postPayload: CreatePostPayload = {
      post: {
        author: {
          id: post.author.id,
          posts: []
        },
        id: post.id,
        content: post.content,
        reactions: post.reactions,
        tags: post.tags,
        title: post.title
      }
    };
    return postPayload;
  });

  return createPostPayload;
};

export default createPost;
