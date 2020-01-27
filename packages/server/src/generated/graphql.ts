/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Character as CharacterType, Droid as DroidType, Human as HumanType } from '../resolvers/types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export type Article = Publication & {
   __typename?: 'Article',
  periodical: Publication,
};

export type ArticleInput = {
  title: Scalars['String'],
  author: Array<Scalars['String']>,
  publicationDate: Scalars['Date'],
  periodicalID: Scalars['ID'],
};

export type Book = Publication & {
   __typename?: 'Book',
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
  markRead: Scalars['Boolean'],
};


export type MutationAddArticleArgs = {
  article?: Maybe<ArticleInput>
};


export type MutationAddBookArgs = {
  publication?: Maybe<BookInput>
};


export type MutationAddPeriodicalArgs = {
  title: Scalars['String'],
  editor: Array<Scalars['String']>
};


export type MutationAddUserArgs = {
  name: Scalars['String']
};


export type MutationMarkReadArgs = {
  publicationID: Scalars['ID'],
  userID: Scalars['ID']
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
  readBy: Array<User>,
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
  genre?: Maybe<Genre>
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

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  hasRead: Array<Publication>,
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
  Periodical: ResolverTypeWrapper<Periodical>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Article: ResolverTypeWrapper<Article>,
  Publication: ResolverTypeWrapper<Publication>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  User: ResolverTypeWrapper<User>,
  Genre: Genre,
  Mutation: ResolverTypeWrapper<{}>,
  ArticleInput: ArticleInput,
  BookInput: BookInput,
  Book: ResolverTypeWrapper<Book>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Periodical: Periodical,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Article: Article,
  Publication: Publication,
  Date: Scalars['Date'],
  User: User,
  Genre: Genre,
  Mutation: {},
  ArticleInput: ArticleInput,
  BookInput: BookInput,
  Book: Book,
  Boolean: Scalars['Boolean'],
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  periodical?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>,
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, MutationAddArticleArgs>,
  addBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, MutationAddBookArgs>,
  addPeriodical?: Resolver<ResolversTypes['Periodical'], ParentType, ContextType, RequireFields<MutationAddPeriodicalArgs, 'title' | 'editor'>>,
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'name'>>,
  markRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMarkReadArgs, 'publicationID' | 'userID'>>,
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
  readBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  periodicals?: Resolver<Array<ResolversTypes['Periodical']>, ParentType, ContextType>,
  publications?: Resolver<Array<ResolversTypes['Publication']>, ParentType, ContextType, QueryPublicationsArgs>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  periodical?: Resolver<Maybe<ResolversTypes['Periodical']>, ParentType, ContextType, RequireFields<QueryPeriodicalArgs, 'id'>>,
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType, RequireFields<QueryPublicationArgs, 'id'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasRead?: Resolver<Array<ResolversTypes['Publication']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>,
  Book?: BookResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Periodical?: PeriodicalResolvers<ContextType>,
  Publication?: PublicationResolvers,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
