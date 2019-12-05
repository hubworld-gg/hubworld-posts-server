import { Post, QueryPostBySlugArgs, Maybe } from 'schemaTypes';
import { firebaseDocToPost } from 'utils';

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

  const post = firebaseDocToPost(doc, data);

  return post;
};

export default getPostBySlug;
