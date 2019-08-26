/* eslint-disable */
import { GraphQLResolveInfo } from "graphql"
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Character = {
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  friends?: Maybe<Array<Maybe<Character>>>
  appearsIn?: Maybe<Array<Maybe<Episode>>>
  secretBackstory?: Maybe<Scalars["String"]>
}

export type Droid = Character & {
  __typename?: "Droid"
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  friends?: Maybe<Array<Maybe<Character>>>
  appearsIn?: Maybe<Array<Maybe<Episode>>>
  secretBackstory?: Maybe<Scalars["String"]>
  primaryFunction?: Maybe<Scalars["String"]>
}

export enum Episode {
  Newhope = "NEWHOPE",
  Empire = "EMPIRE",
  Jedi = "JEDI"
}

export type Human = Character & {
  __typename?: "Human"
  id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  friends?: Maybe<Array<Maybe<Character>>>
  appearsIn?: Maybe<Array<Maybe<Episode>>>
  homePlanet?: Maybe<Scalars["String"]>
  secretBackstory?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  favorite?: Maybe<Episode>
}

export type MutationFavoriteArgs = {
  episode: Episode
}

export type Query = {
  __typename?: "Query"
  hero?: Maybe<Character>
  human?: Maybe<Human>
  droid?: Maybe<Droid>
}

export type QueryHeroArgs = {
  episode?: Maybe<Episode>
}

export type QueryHumanArgs = {
  id: Scalars["ID"]
}

export type QueryDroidArgs = {
  id: Scalars["ID"]
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Episode: Episode
  Character: ResolverTypeWrapper<Character>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  Human: ResolverTypeWrapper<Human>
  Droid: ResolverTypeWrapper<Droid>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Episode: Episode
  Character: Character
  ID: Scalars["ID"]
  String: Scalars["String"]
  Human: Human
  Droid: Droid
  Mutation: {}
  Boolean: Scalars["Boolean"]
}

export type CharacterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Character"] = ResolversParentTypes["Character"]
> = {
  __resolveType: TypeResolveFn<"Human" | "Droid", ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  friends?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Character"]>>>,
    ParentType,
    ContextType
  >
  appearsIn?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Episode"]>>>,
    ParentType,
    ContextType
  >
  secretBackstory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
}

export type DroidResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Droid"] = ResolversParentTypes["Droid"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  friends?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Character"]>>>,
    ParentType,
    ContextType
  >
  appearsIn?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Episode"]>>>,
    ParentType,
    ContextType
  >
  secretBackstory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  primaryFunction?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
}

export type HumanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Human"] = ResolversParentTypes["Human"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  friends?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Character"]>>>,
    ParentType,
    ContextType
  >
  appearsIn?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Episode"]>>>,
    ParentType,
    ContextType
  >
  homePlanet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  secretBackstory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  favorite?: Resolver<
    Maybe<ResolversTypes["Episode"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFavoriteArgs, "episode">
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hero?: Resolver<
    Maybe<ResolversTypes["Character"]>,
    ParentType,
    ContextType,
    QueryHeroArgs
  >
  human?: Resolver<
    Maybe<ResolversTypes["Human"]>,
    ParentType,
    ContextType,
    RequireFields<QueryHumanArgs, "id">
  >
  droid?: Resolver<
    Maybe<ResolversTypes["Droid"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDroidArgs, "id">
  >
}

export type Resolvers<ContextType = any> = {
  Character?: CharacterResolvers
  Droid?: DroidResolvers<ContextType>
  Human?: HumanResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
