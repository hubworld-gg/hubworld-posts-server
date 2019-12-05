import { Post, QueryPostByIdArgs, Maybe } from 'schemaTypes';

const getPostById = async (
  root: any,
  args: QueryPostByIdArgs,
  context: AppGraphQLContext
): Promise<Maybe<Post>> => {
  const { id } = args;

  const { firestoreClient } = context;

  const doc = await firestoreClient
    .collection('posts')
    .doc(id)
    .get();

  if (!doc.exists) return null;

  const data = doc.data();

  if (!data) return null;

  const post: Post = {
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
  return post;
};

export default getPostById;
