import { User, Post } from 'schemaTypes';
import { firebaseDocToPost } from 'utils';

const getPostsByMe = async (
  user: User,
  args: {},
  context: AppGraphQLContext
): Promise<Post[]> => {
  const { firestoreClient } = context;
  const { id } = user;

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

export default getPostsByMe;
