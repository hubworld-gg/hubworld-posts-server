import { promisify } from 'utils';
import { Post, QueryPostsByAuthorArgs } from 'schemaTypes';

const getPostsByAuthor = async (
  root: any,
  args: QueryPostsByAuthorArgs,
  context: AppGraphQLContext
): Promise<Post[]> => {
  const posts: Post[] = await promisify((callback: any) => {
    const params = {
      TableName: 'HubworldPosts',
      KeyConditionExpression: 'authorId = :v1',
      ExpressionAttributeValues: {
        ':v1': args.id
      }
    };
    context.docClient.query(params, callback);
  }).then((result: any) => {
    const postResult: PostDBType[] = result.Items ?? [];
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

export default getPostsByAuthor;
