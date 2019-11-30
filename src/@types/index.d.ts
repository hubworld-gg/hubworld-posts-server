declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare type PostsDBType = {
  reactions: { type: string; userId: string }[];
  authorId: string;
  postId: string;
  tags: AWS.DynamoDB.DocumentClient.DynamoDbSet<string>;
  content: string;
}[];
