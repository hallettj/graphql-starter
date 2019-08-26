/**
 * The resolvers here are examples adapted from Apollo's Star Wars example
 * server. The data served by the API is hard-coded - normally data would be
 * provided by a database.
 */

import { Resolvers } from "../generated/graphql"
import { getDroid, getFriends, getHero, getHuman } from "./data"

const resolvers: Resolvers = {
  Query: {
    hero: (_root, { episode }) => getHero(episode),
    human: (_root, { id }) => getHuman(id),
    droid: (_root, { id }) => getDroid(id)
  },
  Mutation: {
    favorite: (_root, { episode }) => episode
  },
  Character: {
    __resolveType(data, _context, info) {
      if (getHuman(data.id)) {
        return info.schema.getType("Human") as any
      }
      if (getDroid(data.id)) {
        return info.schema.getType("Droid") as any
      }
      return null
    }
  },
  Human: {
    friends: character => getFriends(character),
    appearsIn: ({ appearsIn }) => appearsIn
  },
  Droid: {
    friends: character => getFriends(character),
    appearsIn: ({ appearsIn }) => appearsIn
  }
}

export default resolvers
