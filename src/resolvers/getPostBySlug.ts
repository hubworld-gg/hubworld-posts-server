import { Post, QueryPostBySlugArgs, Maybe } from 'schemaTypes';

const getPostBySlug = async (
  root: any,
  args: QueryPostBySlugArgs,
  context: AppGraphQLContext
): Promise<Maybe<Post>> => {
  const { slug } = args;

  const { firestoreClient } = context;

  const query = await firestoreClient
    .collection('posts')
    .where('slug', '==', slug)
    .get();

  if (query.empty) return null;

  const doc = query.docs[0];
  const data = doc.data();

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

export default getPostBySlug;
