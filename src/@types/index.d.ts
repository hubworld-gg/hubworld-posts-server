declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare type PostDBType = {
  postId: string;
  authorId: string;
  title: string;
  content: string;
  tags: AWS.DynamoDB.DocumentClient.StringSet;
  reactions: { type: string; userId: string }[];
};

declare type AppGraphQLContext = {
  userID: String;
  docClient: AWS.DynamoDB.DocumentClient;
};
