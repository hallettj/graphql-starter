# graphql-starter

This repo implements a minimal GraphQL app that provides end-to-end type safety
using graphql-codegen. It demonstrates setting up server and client using
Apollo, making queries from React components, and testing.

_Make sure yarn is installed https://yarnpkg.com/lang/en/docs/install_

Before running tests or running the app install dependencies by running this
command in the project directory:

    $ yarn

To run tests run:

    $ yarn test

To run the app (a browser window will open automatically):

    $ yarn start:server # wait until the server is running
	$ yarn start:client

Some key points to note:

## file: `schema.graphql`

The source of truth on *what* the GraphQL API can do is defined in
`schema.graphql`. This repo uses a toy schema that provides information about
Star Wars characters. Code generation steps produce TypeScript code for both
server and client that matches up with types defined in `schema.graphql`. After
making any changes to the schema (or to any file ending in `.graphql`) make sure
to run code generation with this command:

    $ yarn workspaces run codegen

The schema declares types that represent your API graph. Every operation
requests fields from the top-level type (either `Query` or `Mutation` depending
on the type of operation), and may select nested fields from top-level field
values, and so on.

## folder: `resolvers/`

Resolvers are the implementation of your API. The determine *how* the API works.
You can see the resolvers implemented in
`packages/server/src/resolvers/index.ts`.

- For every `type` or `interface` in `schema.graphql` there is a resolver, which
is an object containing a method to produce a value for each field of the
GraphQL type. For example the top-level query object in `schema.graphql` is
`Query` which has `hero`, `human`, and `droid` fields. There is
a corresponding `Query` resolver in `resolvers/index.ts` with methods with the
same names.

- Each resolver method is called when responding to a query that requests the
corresponding field. The method takes as arguments a "parent" value, and an
object with variables given for that field in the query (if any). At the
top-level the parent value might not be meaningful. But notice the value that
the `Query` resolver's `human` method returns - the same value will be given as
the parent value when the `Human` resolver methods are called.

- The value that a resolver method returns might not match what the schema
specifies as the type of the corresponding field. For example the schema
declares that the `human` field of `Query` is an object with a `friends` field
that is an array of `Character`s. But in the resolver implementation the
`friends` property is actually an array of IDs. The `friends` method on the
`Human` resolver does the translation from IDs to `Character`s. This allows the
schema graph to be theoretically infinitely deep, or to include cycles.
Resolvers lazily expand field values as requested.

- A resolver might not implement a method for every field in the corresponding
GraphQL type. If its parent value is a JavaScript object, and there is no method
for a given field, graphql will look for the field value in the JavaScript
object instead. For example the `Human` GraphQL type has `id` and `name` fields,
but there are no corresponding resolver methods. This is because the `human`
method on the `Query` resolver returns an object that has properties with those
values.

_Note:_ that the `resolvers` object is annotated with the `Resolvers` type, which
comes from generated code. This ensures that your API implementation is
type-compatible with the source of truth: the schema declared in
`schema.graphql`.

### testing resolvers

You can see an example of a resolver test in `resolvers/index.test.ts`. The
approach is to make actual GraphQL queries, and to make assertions on the
response. The test calls the `graphql` function directly which means that there
is no need for a network server when running tests.

## implementation
The setup in graphql-starter depends on using Apollo on the client side, but 
could work just as well with a different implementation on the server side. 
The generated server-side code is used by the graphql module, which is the 
reference GraphQL implementation. The Apollo server pretty much just mediates 
between HTTP and graphql. If there is a different GraphQL server that integrates 
better with Koa, and can accept an executable schema from graphql, that would be fine.

## code generation

Code generation is configured in `packages/server/codegen.yml` and
`packages/client/codegen.yml`. Running the `codegen` yarn tasks produces
`packages/server/src/generated/graphql.ts` and
`packages/client/src/generated/graphql.tsx`.

### generated server code

The server's generated code provides types for resolvers to make sure that your
API implementation matches the types declared in the schema. The most important
type is `Resolvers` which should match the type of the resolvers that you write
in TypeScript. But if you look at the generated file you can see that there are
a number of types that you can import and use.

As is mentioned in the previous section the "parent" values that resolvers use
might not match the types defined in the schema. In other words resolvers are
backed by implementation types that are private to the server implementation. In
some cases it is necessary to inform graphql-codegen what those types are so
that it can supply the correct types in generated resolver types. That is done
with the `mappers` map in `codegen.yml`. That section maps GraphQL types to the
module path and type name of the corresponding implementation type. For example
consider this mapping:

    Human: ../resolvers/types#Human

The GraphQL type is on the left, the TypeScript module path and type name are on
the right. This mapping instructs graphql-codegen that it should produce
a generated file with a line like this,

    import { Human } from '../resolvers/types';

and that it should use that imported `Human` type as the type for parent values
for the `Human` resolver. The imported type differs from the GraphQL type in
that the imported type's `friends` property is an array of IDs instead of an
array of `Character`s.

### generated client code

The client's generated code provides type-safe React hooks. Operations (queries
and mutations) are read from `*.graphql` files in the client's source directory.
Generated code includes a React hook for each of those operations.
Graphql-codegen cross-references operations with the schema to calculate the
exact type for response data for each operation, and the type of variables used
by each operation.

In this repo operations are listed in `packages/client/src/operations.graphql`.
You may put operations into multiple files; but generated code will be combined
into one file, so be sure to avoid name conflicts in your query and mutation
names.

Each operation maps to a generated React hook according to this pattern:

    query getHero => useGetHeroQuery
	mutation setFavorite => useSetFavoriteMutation

## GraphQL in React components

There are examples of a query and a mutation in `App.tsx`. Generated hooks
behave exactly like `useQuery` and `useMutation` from `@apollo/react-hooks`
except that the first argument, the query document, is pre-filled. See
https://www.apollographql.com/docs/react/api/react-hooks/

Calling a query hook returns a result object which has `data`, `loading`, and
`error` properties. Note that TypeScript will infer a type for `data` that
exactly matches the set of fields that you requested. The query is dispatched
immediately on first render. On re-render the query will only be dispatched
again if its variables have changed.

Calling a mutation hook returns a pair of a function to call to dispatch the
mutation, and a result object. The mutation is not dispatched automatically. The
result object is identical to the result object that you get from a query except
that it has an additional boolean `called` property that indicates whether the
mutation has been dispatched. You can specify variables for the mutation either
when you call the hook, or when you call the returned function to actually
dispatch the mutation.

### Testing React Components

There are examples of tests in `App.test.tsx`. To keep the test environment
simple the client tests do not send real requests to the server. Instead you can
provide mocks to specify canned responses for specific queries and mutations.
You can read more about this form of testing here:

https://www.apollographql.com/docs/react/recipes/testing/

This repo uses a helper function, `mount` defined in `testing.tsx`, to
automatically wrap tested React components with `MockedProvider`. Any component
that calls Apollo's React hooks must be wrapped with some provider to specify
how operations are to be dispatched. Usually that will be `ApolloProvider` or
`MockedProvider`.

## file: `packages/server/src/schema.ts`

A GraphQL server requires a schema (sometimes called `typeDefs`), and resolvers.
It uses the schema to validate requests, and to serve a reflection API so that
clients can request information about the schema at runtime. It uses resolvers
to respond to queries and mutations. Putting the schema and resolvers together
produces an "executable schema", which is a single value that provides
everything a server needs to serve a GraphQL API.

`schema.ts` produces such an executable schema which is suitable for serving in
production, and for use in tests.

## file: `packages/server/src/index.ts`

This repo serves a standalone GraphQL service. Behind the scenes `ApolloServer`
uses Express. If you prefer you can put the GraphQL service behind an HTTP route
in a larger server. Or you can install Express middleware in a standalone server
to handle details such as authentication.

## file: `packages/client/src/index.tsx`

The client app must configure the GraphQL API that it will send queries to. That
is done by creating an `ApolloClient` instance with the appropriate `uri` value,
and passing the client instance to an `ApolloProvider` component that wraps the
rest of the React application.
