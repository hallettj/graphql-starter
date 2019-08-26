import { ApolloServer } from "apollo-server"
import schema from "./schema"

const port = process.env.PORT || "4000"
const server = new ApolloServer({ schema })

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
