import { Character, Droid, Episode, Human, ID } from "./types"

const humans: Human[] = [
  {
    id: "1000",
    name: "Luke Skywalker",
    friends: ["1002", "1003", "2000", "2001"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi],
    homePlanet: "Tatooine"
  },
  {
    id: "1001",
    name: "Darth Vader",
    friends: ["1004"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi],
    homePlanet: "Tatooine"
  },
  {
    id: "1002",
    name: "Han Solo",
    friends: ["1000", "1003", "2001"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi]
  },
  {
    id: "1003",
    name: "Leia Organa",
    friends: ["1000", "1002", "2000", "2001"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi],
    homePlanet: "Alderaan"
  },
  {
    id: "1004",
    name: "Wilhuff Tarkin",
    friends: ["1001"],
    appearsIn: [Episode.Newhope]
  }
]

export const humanData: Record<ID, Human> = {}
humans.forEach(human => {
  humanData[human.id] = human
})

const droids = [
  {
    id: "2000",
    name: "C-3PO",
    friends: ["1000", "1002", "1003", "2001"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi],
    primaryFunction: "Protocol"
  },
  {
    id: "2001",
    name: "R2-D2",
    friends: ["1000", "1002", "1003"],
    appearsIn: [Episode.Newhope, Episode.Empire, Episode.Jedi],
    primaryFunction: "Astromech"
  }
]

export const droidData: Record<ID, Droid> = {}
droids.forEach(droid => {
  droidData[droid.id] = droid
})

/**
 * Helper function to get a character by ID.
 */
export function getCharacter(id: string): Promise<Character> {
  // Returning a promise just to illustrate GraphQL.js's support.
  const character = humanData[id] || droidData[id]
  if (!character) {
    throw new Error(`Could not find character with ID ${id}`)
  }
  return Promise.resolve(character)
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
export function getHero(episode: string | null | undefined): Character {
  if (episode === Episode.Empire) {
    // Luke is the hero of Episode V.
    return humanData["1000"]
  }
  // Artoo is the hero otherwise.
  return droidData["2001"]
}

/**
 * Allows us to query for the human with the given id.
 */
export function getHuman(id: ID): Human | null {
  return humanData[id] || null
}

/**
 * Allows us to query for the droid with the given id.
 */
export function getDroid(id: ID): Droid | null {
  return droidData[id] || null
}

/**
 * Allows us to get a list of friends for a character.
 */
export function getFriends(character: Character): Promise<Character[]> {
  return Promise.all(character.friends.map(getCharacter))
}
