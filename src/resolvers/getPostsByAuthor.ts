import { Post, QueryPostsByAuthorArgs } from 'schemaTypes';
import { firebaseDocToPost } from 'utils';

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
    const post = firebaseDocToPost(doc, data);
    return post;
  });

  return posts;
};

export default getPostsByAuthor;
