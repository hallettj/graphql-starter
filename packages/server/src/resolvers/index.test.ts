import { graphql } from "graphql"
import schema from "../schema"

/**
 * Resolvers can be tested by making GraphQL queries against the real schema.
 * When `graphql` is called directly the query is not dispatched over a network
 * - the query and response are handled in-process.
 */
it("looks up a human by id", async () => {
  const result = await request(
    `
      query getHuman($id: ID!) {
        human(id: $id) {
          id
          name
          friends {
            __typename
            id
            name
          }
          appearsIn
          homePlanet
        }
      }
    `,
    { variables: { id: "1000" } }
  )
  expect(result).toEqual({
    data: {
      human: {
        id: "1000",
        name: "Luke Skywalker",
        friends: [
          { __typename: "Human", id: "1002", name: "Han Solo" },
          { __typename: "Human", id: "1003", name: "Leia Organa" },
          { __typename: "Droid", id: "2000", name: "C-3PO" },
          { __typename: "Droid", id: "2001", name: "R2-D2" }
        ],
        appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
        homePlanet: "Tatooine"
      }
    }
  })
})

function request(
  query: string,
  { variables }: { variables?: Record<string, unknown> } = {}
) {
  return graphql(schema, query, null, null, variables)
}
