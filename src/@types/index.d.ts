declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare type PostDBType = {
  reactions: { type: string; userId: string }[];
  authorId: string;
  postId: string;
  tags: AWS.DynamoDB.DocumentClient.StringSet;
  content: string;
};

declare type AppGraphQLContext = {
  userID: String;
  docClient: AWS.DynamoDB.DocumentClient;
};
