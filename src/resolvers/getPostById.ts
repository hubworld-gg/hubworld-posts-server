import { promisify } from 'utils';
import { Post, QueryPostByIdArgs, Maybe } from 'schemaTypes';

const getPostById = async (
  root: any,
  args: QueryPostByIdArgs,
  context: AppGraphQLContext
): Promise<Maybe<Post>> => {
  const post: Maybe<Post> = await promisify((callback: any) => {
    const params = {
      TableName: 'HubworldPosts',
      KeyConditionExpression: 'postId = :v1',
      ExpressionAttributeValues: {
        ':v1': args.id
      }
    };
    context.docClient.query(params, callback);
  }).then((result: any) => {
    const postResult: PostDBType = result.Items?.[0];

    if (!postResult) return null;

    const post: Post = {
      author: {
        id: postResult.authorId,
        posts: []
      },
      id: postResult.postId,
      reactions: postResult.reactions.map(r => ({
        type: r.type,
        user: {
          id: r.userId,
          posts: []
        }
      })),
      tags: postResult.tags.values,
      content: postResult.content
    };
    return post;
  });
  return post;
};

export default getPostById;
