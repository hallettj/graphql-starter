/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Article as ArticleType, Book as BookType, Periodical as PeriodicalType, Publication as PublicationType, Review as ReviewType, User as UserType } from '../database';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: Date,
};

export type Article = Publication & {
   __typename?: 'Article',
  /** Publication fields */
  id: Scalars['ID'],
  title: Scalars['String'],
  /** A publication has at least one, but possibly more, authors. */
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  /** Article-specific fields */
  reviews: Array<Review>,
  periodical: Periodical,
};

export type ArticleInput = {
  title: Scalars['String'],
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  periodicalID: Scalars['ID'],
};

export type Book = Publication & {
   __typename?: 'Book',
  /** Publication fields */
  id: Scalars['ID'],
  title: Scalars['String'],
  /** A publication has at least one, but possibly more, authors. */
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  reviews: Array<Review>,
  /** Book-specific fields */
  isbn: Scalars['String'],
  genre?: Maybe<Genre>,
};

export type BookInput = {
  title: Scalars['String'],
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  isbn: Scalars['String'],
  genre?: Maybe<Genre>,
};


export enum Genre {
  Poetry = 'POETRY',
  Fiction = 'FICTION',
  NonFiction = 'NON_FICTION',
  Drama = 'DRAMA'
}

export type Mutation = {
   __typename?: 'Mutation',
  addArticle: Article,
  addBook: Book,
  addPeriodical: Periodical,
  addUser: User,
  addReview: Review,
};


export type MutationAddArticleArgs = {
  article: ArticleInput
};


export type MutationAddBookArgs = {
  book: BookInput
};


export type MutationAddPeriodicalArgs = {
  title: Scalars['String'],
  editor: Array<Scalars['String']>
};


export type MutationAddUserArgs = {
  name: Scalars['String']
};


export type MutationAddReviewArgs = {
  review: ReviewInput
};

export type Periodical = {
   __typename?: 'Periodical',
  id: Scalars['ID'],
  title: Scalars['String'],
  /** A periodical has at least one, but possibly more, editors. */
  editor: Array<Scalars['String']>,
  articles: Array<Article>,
};

export type Publication = {
  id: Scalars['ID'],
  title: Scalars['String'],
  /** A publication has at least one, but possibly more, authors. */
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  reviews: Array<Review>,
};

export type Query = {
   __typename?: 'Query',
  periodicals: Array<Periodical>,
  publications: Array<Publication>,
  users: Array<User>,
  periodical?: Maybe<Periodical>,
  publication?: Maybe<Publication>,
  user?: Maybe<User>,
};


export type QueryPublicationsArgs = {
  after?: Maybe<Scalars['Date']>,
  before?: Maybe<Scalars['Date']>,
  genre?: Maybe<Genre>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryPeriodicalArgs = {
  id: Scalars['ID']
};


export type QueryPublicationArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Review = {
   __typename?: 'Review',
  id: Scalars['ID'],
  user: User,
  publication: Publication,
  score: Scalars['Int'],
  text?: Maybe<Scalars['String']>,
};

export type ReviewInput = {
  publicationID: Scalars['ID'],
  userID: Scalars['ID'],
  score: Scalars['Int'],
  text?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  reviews: Array<Review>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Periodical: ResolverTypeWrapper<PeriodicalType>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Article: ResolverTypeWrapper<ArticleType>,
  Publication: ResolverTypeWrapper<PublicationType>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Review: ResolverTypeWrapper<ReviewType>,
  User: ResolverTypeWrapper<UserType>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Genre: Genre,
  Mutation: ResolverTypeWrapper<{}>,
  ArticleInput: ArticleInput,
  BookInput: BookInput,
  Book: ResolverTypeWrapper<BookType>,
  ReviewInput: ReviewInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Periodical: PeriodicalType,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Article: ArticleType,
  Publication: PublicationType,
  Date: Scalars['Date'],
  Review: ReviewType,
  User: UserType,
  Int: Scalars['Int'],
  Genre: Genre,
  Mutation: {},
  ArticleInput: ArticleInput,
  BookInput: BookInput,
  Book: BookType,
  ReviewInput: ReviewInput,
  Boolean: Scalars['Boolean'],
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  publicationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
  periodical?: Resolver<ResolversTypes['Periodical'], ParentType, ContextType>,
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  publicationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationAddArticleArgs, 'article'>>,
  addBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddBookArgs, 'book'>>,
  addPeriodical?: Resolver<ResolversTypes['Periodical'], ParentType, ContextType, RequireFields<MutationAddPeriodicalArgs, 'title' | 'editor'>>,
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'name'>>,
  addReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationAddReviewArgs, 'review'>>,
};

export type PeriodicalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Periodical'] = ResolversParentTypes['Periodical']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  editor?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>,
};

export type PublicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication']> = {
  __resolveType: TypeResolveFn<'Article' | 'Book', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  publicationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  periodicals?: Resolver<Array<ResolversTypes['Periodical']>, ParentType, ContextType>,
  publications?: Resolver<Array<ResolversTypes['Publication']>, ParentType, ContextType, QueryPublicationsArgs>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  periodical?: Resolver<Maybe<ResolversTypes['Periodical']>, ParentType, ContextType, RequireFields<QueryPeriodicalArgs, 'id'>>,
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType, RequireFields<QueryPublicationArgs, 'id'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  publication?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>,
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>,
  Book?: BookResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Periodical?: PeriodicalResolvers<ContextType>,
  Publication?: PublicationResolvers,
  Query?: QueryResolvers<ContextType>,
  Review?: ReviewResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
