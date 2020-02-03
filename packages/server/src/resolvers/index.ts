import { GraphQLDate } from "graphql-iso-date"
import { Resolvers } from "../generated/graphql"
import * as database from "../database"

const resolvers: Resolvers = {
  Query: {
    periodicals: () => database.allPeriodicals(),
    publications: (_root, { after, before, genre, limit }) =>
      database.allPublications({ after, before, genre, limit }),
    users: () => database.allUsers(),

    periodical: (_root, { id }) => database.getPeriodical(id),
    publication: (_root, { id }) => database.getPublication(id),
    user: (_root, { id }) => database.getUser(id)
  },
  Mutation: {
    addArticle: (_root, { article }) => database.addArticle(article),
    addBook: (_root, { book }) => database.addBook(book),
    addPeriodical: (_root, { title, editor }) =>
      database.addPeriodical({ title, editor }),
    addUser: (_root, { name }) => database.addUser({ name }),
    addReview: (_root, { review }) => database.addReview(review)
  },
  Publication: {
    __resolveType(publication, _context, info) {
      if (database.isArticle(publication)) {
        return info.schema.getType("Article") as any
      }
      if (database.isBook(publication)) {
        return info.schema.getType("Book") as any
      }
      return null
    }
  },
  Article: {
    averageReviewScore: article => database.getAverageReviewScore(article),
    periodical: article => database.getPeriodical(article.periodicalID),
    reviews: article => database.getReviewsFor(article)
  },
  Book: {
    averageReviewScore: book => database.getAverageReviewScore(book),
    reviews: book => database.getReviewsFor(book)
  },
  Periodical: {
    articles: periodical => database.getArticlesByPeriodical(periodical)
  },
  User: {
    reviews: user => database.getReviewsBy(user)
  },
  Review: {
    publication: review => database.getPublication(review.publicationID),
    user: review => database.getUser(review.userID)
  },
  Date: GraphQLDate
}

export default resolvers
