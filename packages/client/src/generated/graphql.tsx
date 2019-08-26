/* eslint-disable */
import { DocumentNode } from "graphql"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
export type Maybe<T> = T | null
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
export type GetHeroQueryVariables = {
  episode: Episode
}

export type GetHeroQuery = { __typename?: "Query" } & {
  hero: Maybe<
    | ({ __typename?: "Human" } & Pick<Human, "id" | "name">)
    | ({ __typename?: "Droid" } & Pick<Droid, "id" | "name">)
  >
}

export const GetHeroDocument: DocumentNode = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getHero" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "episode" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Episode" }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hero" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "episode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "episode" }
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: []
                }
              ]
            }
          }
        ]
      }
    }
  ]
}

export function useGetHeroQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetHeroQuery,
    GetHeroQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetHeroQuery, GetHeroQueryVariables>(
    GetHeroDocument,
    baseOptions
  )
}
export function useGetHeroLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetHeroQuery,
    GetHeroQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetHeroQuery, GetHeroQueryVariables>(
    GetHeroDocument,
    baseOptions
  )
}

export type GetHeroQueryHookResult = ReturnType<typeof useGetHeroQuery>
export type GetHeroQueryResult = ApolloReactCommon.QueryResult<
  GetHeroQuery,
  GetHeroQueryVariables
>