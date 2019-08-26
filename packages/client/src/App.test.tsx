import * as React from "react"
import App from "./App"
import * as graphql from "./generated/graphql"
import { mount, updates } from "./testing"

/* Mocks */

// Annotate mocks with generated types to make sure that client code keeps up to
// date the with the server's API
const luke: graphql.GetHeroQueryResult["data"] = {
  __typename: "Query",
  hero: {
    __typename: "Human",
    id: "1000",
    name: "Luke Skywalker",
    friends: [
      { __typename: "Human", id: "1002", name: "Han Solo" },
      { __typename: "Human", id: "1003", name: "Leia Organa" },
      { __typename: "Droid", id: "2000", name: "C-3PO" },
      { __typename: "Droid", id: "2001", name: "R2-D2" }
    ],
    secretBackstory: "Darth Vader is his father!"
  }
}

const r2d2: graphql.GetHeroQueryResult["data"] = {
  __typename: "Query",
  hero: {
    __typename: "Droid",
    id: "2001",
    name: "R2-D2",
    friends: [
      { __typename: "Human", id: "1000", name: "Luke Skywalker" },
      { __typename: "Human", id: "1002", name: "Han Solo" },
      { __typename: "Human", id: "1003", name: "Leia Organa" }
    ],
    secretBackstory: null
  }
}

const newhopeHero = {
  request: {
    query: graphql.GetHeroDocument,
    variables: { episode: graphql.Episode.Newhope }
  },
  result: {
    data: luke
  }
}

const returnOfTheJediHero = {
  request: {
    query: graphql.GetHeroDocument,
    variables: { episode: graphql.Episode.Jedi }
  },
  result: {
    data: r2d2
  }
}

const setFavorite = {
  request: {
    query: graphql.SetFavoriteDocument,
    variables: { episode: graphql.Episode.Newhope }
  },
  result: {
    data: { favorite: graphql.Episode.Newhope }
  }
}

/* Tests */

it("shows a loading indicator while the query is in progress", () => {
  const app = mount(<App />)
  expect(app).toIncludeText("The hero of the episode is: ...")
})

it("initially shows the hero of A New Hope", async () => {
  const app = mount(<App />, {
    // The mock Apollo provider does not send queries to the server. Instead we
    // use mocks to specify the expected response for each GraphQL query. The
    // query document and variables given by the mock must exactly match the
    // query that is received. If you want to handle multiple invocations of the
    // same query you must list the mock multiple times.
    mocks: [newhopeHero]
  })
  await updates(app)
  expect(app.find("ShowHero")).toContainReact(
    <dl>
      <dt>Name</dt>
      <dd>Luke Skywalker</dd>

      <dt>Friends</dt>
      <dd>
        <span>Han Solo</span>
        <span>Leia Organa</span>
        <span>C-3PO</span>
        <span>R2-D2</span>
      </dd>

      <dt>Secret backstory</dt>
      <dd>Darth Vader is his father!</dd>
    </dl>
  )
})

it("shows the hero of Return of the Jedi", async () => {
  const app = mount(<App />, {
    // We list the `newhopeHero` mock first because the app will make that query
    // by default before we select "Return of the Jedi".
    mocks: [newhopeHero, returnOfTheJediHero]
  })
  app.find("select").simulate("change", { target: { value: "JEDI" } })
  await updates(app)
  expect(app.find("ShowHero")).toContainReact(
    <dl>
      <dt>Name</dt>
      <dd>R2-D2</dd>

      <dt>Friends</dt>
      <dd>
        <span>Luke Skywalker</span>
        <span>Han Solo</span>
        <span>Leia Organa</span>
      </dd>

      <dt>Secret backstory</dt>
      <dd></dd>
    </dl>
  )
})

it("dispatches a mutation to set favorite episode", async () => {
  const app = mount(<App />, { mocks: [newhopeHero, setFavorite] })
  const button = app.find(".set-favorite")
  expect(button).toHaveProp("disabled", false)

  button.simulate("click")

  await updates(app)
  // We would get an error at about this point if we had not provided the
  // `setFavorite` mock response.
  expect(button).toHaveProp("disabled", false)
})
