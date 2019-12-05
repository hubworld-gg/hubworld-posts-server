import { Post, QueryPostsByAuthorArgs } from 'schemaTypes';

const getPostsByAuthor = async (
  root: any,
  args: QueryPostsByAuthorArgs,
  context: AppGraphQLContext
): Promise<Post[]> => {
  const { firestoreClient } = context;
  const { id } = args;

  const query = await firestoreClient
    .collection('posts')
    .where('authorId', '==', id)
    .get();

  if (query.empty) return [];

  const posts: Post[] = query.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      author: {
        id: data.authorId,
        posts: []
      },
      title: data.title,
      slug: data.slug,
      content: data.content,
      tags: data.tags,
      reactions:
        data.reactions?.map((r: any) => ({
          type: r.type,
          user: {
            id: r.userId,
            posts: []
          }
        })) ?? []
    };
  });

  return posts;
};

export default getPostsByAuthor;
