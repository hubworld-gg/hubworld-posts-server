import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type CreatePostInput = {
  post: PostInput,
};

export type CreatePostPayload = {
   __typename?: 'CreatePostPayload',
  post?: Maybe<Post>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createPost?: Maybe<CreatePostPayload>,
};


export type MutationCreatePostArgs = {
  input: CreatePostInput
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  author: User,
  content: Scalars['String'],
  tags: Array<Scalars['String']>,
  reactions: Array<Reaction>,
};

export type PostInput = {
  authorId: Scalars['String'],
  title: Scalars['String'],
  content: Scalars['String'],
  tags?: Maybe<Array<Scalars['String']>>,
};

export type Query = {
   __typename?: 'Query',
  postsByAuthor: Array<Post>,
  postById?: Maybe<Post>,
};


export type QueryPostsByAuthorArgs = {
  id: Scalars['ID']
};


export type QueryPostByIdArgs = {
  id: Scalars['ID']
};

export type Reaction = {
   __typename?: 'Reaction',
  type: Scalars['String'],
  user: User,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  posts: Array<Post>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  Reaction: ResolverTypeWrapper<Reaction>,
  Mutation: ResolverTypeWrapper<{}>,
  CreatePostInput: CreatePostInput,
  PostInput: PostInput,
  CreatePostPayload: ResolverTypeWrapper<CreatePostPayload>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Post: Post,
  String: Scalars['String'],
  User: User,
  Reaction: Reaction,
  Mutation: {},
  CreatePostInput: CreatePostInput,
  PostInput: PostInput,
  CreatePostPayload: CreatePostPayload,
  Boolean: Scalars['Boolean'],
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  postsByAuthor?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostsByAuthorArgs, 'id'>>,
  postById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostByIdArgs, 'id'>>,
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Post']>, { __typename: 'Post' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & Pick<ParentType, 'id'>, ContextType>,

  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
}>;

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<Maybe<ResolversTypes['CreatePostPayload']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>,
}>;

export type CreatePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostPayload'] = ResolversParentTypes['CreatePostPayload']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Reaction?: ReactionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  CreatePostPayload?: CreatePostPayloadResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
