import { Maybe, Post, QueryPostsByTagArgs } from 'schemaTypes';
import { firebaseDocToPost } from 'utils';

const getPostsByTags = async (
  root: any,
  args: QueryPostsByTagArgs,
  context: AppGraphQLContext
): Promise<Maybe<Post[]>> => {
  const { firestoreClient } = context;
  const { tag } = args;

  const query = await firestoreClient
    .collection('posts')
    .where('_tags', 'array-contains', tag.toLowerCase())
    .get();

  if (query.empty) return null;

  const posts: Post[] = query.docs.map(doc => {
    const data = doc.data();
    const post = firebaseDocToPost(doc, data);
    return post;
  });

  return posts;
};

export default getPostsByTags;
