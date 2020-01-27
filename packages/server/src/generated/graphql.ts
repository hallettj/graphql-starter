/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
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
};

/** A character in the Star Wars Trilogy */
export type Character = {
  /** The id of the character. */
  id: Scalars['ID'],
  /** The name of the character. */
  name?: Maybe<Scalars['String']>,
  /** The friends of the character, or an empty list if they have none. */
  friends?: Maybe<Array<Maybe<Character>>>,
  /** Which movies they appear in. */
  appearsIn?: Maybe<Array<Maybe<Episode>>>,
  /** All secrets about their past. */
  secretBackstory?: Maybe<Scalars['String']>,
};

/** A mechanical creature in the Star Wars universe. */
export type Droid = Character & {
   __typename?: 'Droid',
  /** The id of the droid. */
  id: Scalars['ID'],
  /** The name of the droid. */
  name?: Maybe<Scalars['String']>,
  /** The friends of the droid, or an empty list if they have none. */
  friends?: Maybe<Array<Maybe<Character>>>,
  /** Which movies they appear in. */
  appearsIn?: Maybe<Array<Maybe<Episode>>>,
  /** Construction date and the name of the designer. */
  secretBackstory?: Maybe<Scalars['String']>,
  /** The primary function of the droid. */
  primaryFunction?: Maybe<Scalars['String']>,
};

/** One of the films in the Star Wars Trilogy */
export enum Episode {
  /** Released in 1977. */
  Newhope = 'NEWHOPE',
  /** Released in 1980. */
  Empire = 'EMPIRE',
  /** Released in 1983. */
  Jedi = 'JEDI'
}

/** A humanoid creature in the Star Wars universe. */
export type Human = Character & {
   __typename?: 'Human',
  /** The id of the human. */
  id: Scalars['ID'],
  /** The name of the human. */
  name?: Maybe<Scalars['String']>,
  /** The friends of the human, or an empty list if they have none. */
  friends?: Maybe<Array<Maybe<Character>>>,
  /** Which movies they appear in. */
  appearsIn?: Maybe<Array<Maybe<Episode>>>,
  /** The home planet of the human, or null if unknown. */
  homePlanet?: Maybe<Scalars['String']>,
  /** Where are they from and how they came to be who they are. */
  secretBackstory?: Maybe<Scalars['String']>,
};

/** Root Mutation */
export type Mutation = {
   __typename?: 'Mutation',
  /** Save the favorite episode. */
  favorite?: Maybe<Episode>,
};


/** Root Mutation */
export type MutationFavoriteArgs = {
  episode: Episode
};

/** Root query */
export type Query = {
   __typename?: 'Query',
  /** Return the hero by episode. */
  hero: Character,
  /** Return the Human by ID. */
  human?: Maybe<Human>,
  /** Return the Droid by ID. */
  droid?: Maybe<Droid>,
};


/** Root query */
export type QueryHeroArgs = {
  episode?: Maybe<Episode>
};


/** Root query */
export type QueryHumanArgs = {
  id: Scalars['ID']
};


/** Root query */
export type QueryDroidArgs = {
  id: Scalars['ID']
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
  Episode: Episode,
  Character: ResolverTypeWrapper<CharacterType>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Human: ResolverTypeWrapper<HumanType>,
  Droid: ResolverTypeWrapper<DroidType>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Episode: Episode,
  Character: CharacterType,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Human: HumanType,
  Droid: DroidType,
  Mutation: {},
  Boolean: Scalars['Boolean'],
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  __resolveType: TypeResolveFn<'Human' | 'Droid', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>,
  appearsIn?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>,
  secretBackstory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type DroidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Droid'] = ResolversParentTypes['Droid']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>,
  appearsIn?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>,
  secretBackstory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  primaryFunction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type HumanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Human'] = ResolversParentTypes['Human']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>,
  appearsIn?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>,
  homePlanet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  secretBackstory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  favorite?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<MutationFavoriteArgs, 'episode'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hero?: Resolver<ResolversTypes['Character'], ParentType, ContextType, QueryHeroArgs>,
  human?: Resolver<Maybe<ResolversTypes['Human']>, ParentType, ContextType, RequireFields<QueryHumanArgs, 'id'>>,
  droid?: Resolver<Maybe<ResolversTypes['Droid']>, ParentType, ContextType, RequireFields<QueryDroidArgs, 'id'>>,
};

export type Resolvers<ContextType = any> = {
  Character?: CharacterResolvers,
  Droid?: DroidResolvers<ContextType>,
  Human?: HumanResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
