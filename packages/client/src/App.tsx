import * as React from "react"
import {
  Episode,
  useGetHeroQuery,
  useSetFavoriteMutation
} from "./generated/graphql"

export default function App() {
  const [episode, setEpisode] = React.useState<Episode>(Episode.Newhope)
  return (
    <div>
      <div>
        Select a Star Wars episode:
        <select
          value={episode}
          onChange={event => setEpisode(event.target.value as Episode)}
        >
          <option value={Episode.Newhope}>A New Hope</option>
          <option value={Episode.Empire}>The Empire Strikes Back</option>
          <option value={Episode.Jedi}>Return of the Jedi</option>
        </select>
        <SetFavorite episode={episode} />
      </div>
      <div>
        The hero of the episode is: <ShowHero episode={episode} />
      </div>
    </div>
  )
}

function ShowHero({ episode }: { episode: Episode }) {
  // Notice that TypeScript infers accurate types for all of the data
  // properties, and for the necessary variables for this query.
  const { data, loading, error } = useGetHeroQuery({ variables: { episode } })
  if (loading || !data) {
    return <div>...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  const { name, friends, secretBackstory } = data.hero
  return (
    <dl>
      <dt>Name</dt>
      <dd>{name}</dd>

      <dt>Friends</dt>
      <dd>
        {(friends || []).map(
          friend => friend && <span key={friend.id}>{friend.name}</span>
        )}
      </dd>

      <dt>Secret backstory</dt>
      <dd>{secretBackstory}</dd>
    </dl>
  )
}

function SetFavorite({ episode }: { episode: Episode }) {
  const [setFavorite, result] = useSetFavoriteMutation()
  return (
    <button
      className="set-favorite"
      disabled={result.loading}
      onClick={() => setFavorite({ variables: { episode } })}
    >
      Set as favorite
    </button>
  )
}
