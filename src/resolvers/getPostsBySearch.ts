import { Maybe, Post, QueryPostsBySearchArgs } from 'schemaTypes';
import { firebaseDocToPost, getStartsWithCodes } from 'utils';

const getPostsBySearch = async (
  root: any,
  args: QueryPostsBySearchArgs,
  context: AppGraphQLContext
): Promise<Maybe<Post[]>> => {
  const { firestoreClient } = context;
  const { search } = args;

  const { startcode, endcode } = getStartsWithCodes(search.toLowerCase());

  const query = await firestoreClient
    .collection('posts')
    .where('_title', '>=', startcode)
    .where('_title', '<', endcode)
    .get();

  if (query.empty) return null;

  const posts: Post[] = query.docs.map(doc => {
    const data = doc.data();
    const post = firebaseDocToPost(doc, data);
    return post;
  });

  return posts;
};

export default getPostsBySearch;
