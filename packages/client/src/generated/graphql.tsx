/* eslint-disable */
import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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

export type GetHeroQueryVariables = {
  episode: Episode
};


export type GetHeroQuery = (
  { __typename?: 'Query' }
  & { hero: (
    { __typename?: 'Human' }
    & Pick<Human, 'id' | 'name' | 'secretBackstory'>
    & { friends: Maybe<Array<Maybe<(
      { __typename?: 'Human' }
      & Pick<Human, 'id' | 'name'>
    ) | (
      { __typename?: 'Droid' }
      & Pick<Droid, 'id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Droid' }
    & Pick<Droid, 'id' | 'name' | 'secretBackstory'>
    & { friends: Maybe<Array<Maybe<(
      { __typename?: 'Human' }
      & Pick<Human, 'id' | 'name'>
    ) | (
      { __typename?: 'Droid' }
      & Pick<Droid, 'id' | 'name'>
    )>>> }
  ) }
);

export type SetFavoriteMutationVariables = {
  episode: Episode
};


export type SetFavoriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'favorite'>
);


export const GetHeroDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHero"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"episode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Episode"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hero"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"episode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"episode"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"friends"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"secretBackstory"},"arguments":[],"directives":[]}]}}]}}]};

/**
 * __useGetHeroQuery__
 *
 * To run a query within a React component, call `useGetHeroQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHeroQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHeroQuery({
 *   variables: {
 *      episode: // value for 'episode'
 *   },
 * });
 */
export function useGetHeroQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetHeroQuery, GetHeroQueryVariables>) {
        return ApolloReactHooks.useQuery<GetHeroQuery, GetHeroQueryVariables>(GetHeroDocument, baseOptions);
      }
export function useGetHeroLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHeroQuery, GetHeroQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetHeroQuery, GetHeroQueryVariables>(GetHeroDocument, baseOptions);
        }
export type GetHeroQueryHookResult = ReturnType<typeof useGetHeroQuery>;
export type GetHeroLazyQueryHookResult = ReturnType<typeof useGetHeroLazyQuery>;
export type GetHeroQueryResult = ApolloReactCommon.QueryResult<GetHeroQuery, GetHeroQueryVariables>;
export const SetFavoriteDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"episode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Episode"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"episode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"episode"}}}],"directives":[]}]}}]};
export type SetFavoriteMutationFn = ApolloReactCommon.MutationFunction<SetFavoriteMutation, SetFavoriteMutationVariables>;

/**
 * __useSetFavoriteMutation__
 *
 * To run a mutation, you first call `useSetFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFavoriteMutation, { data, loading, error }] = useSetFavoriteMutation({
 *   variables: {
 *      episode: // value for 'episode'
 *   },
 * });
 */
export function useSetFavoriteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetFavoriteMutation, SetFavoriteMutationVariables>) {
        return ApolloReactHooks.useMutation<SetFavoriteMutation, SetFavoriteMutationVariables>(SetFavoriteDocument, baseOptions);
      }
export type SetFavoriteMutationHookResult = ReturnType<typeof useSetFavoriteMutation>;
export type SetFavoriteMutationResult = ApolloReactCommon.MutationResult<SetFavoriteMutation>;
export type SetFavoriteMutationOptions = ApolloReactCommon.BaseMutationOptions<SetFavoriteMutation, SetFavoriteMutationVariables>;