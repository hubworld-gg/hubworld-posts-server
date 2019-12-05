import { Post, QueryPostByIdArgs, Maybe } from 'schemaTypes';
import { firebaseDocToPost } from 'utils';

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

  const post = firebaseDocToPost(doc, data);

  return post;
};

export default getPostById;
