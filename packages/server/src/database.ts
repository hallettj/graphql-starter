import orderBy from "lodash/orderBy"
import { Genre } from "./generated/graphql"

export type ID = string

let lastId = 0
const mkId = (): ID => {
  return `${lastId++}`
}

export interface Publication {
  id: ID
  title: string
  author: string[]
  publicationDate: Date
}

export interface Article extends Publication {
  periodicalID: ID
}

export interface Book extends Publication {
  isbn: string
  genre?: Genre | null
}

export interface Periodical {
  id: ID
  title: string
  editor: string[]
}

export interface Review {
  id: ID
  userID: ID
  publicationID: ID
  score: number
  text?: string | null
}

export interface User {
  id: ID
  name: string
}

const nature = { id: mkId(), title: "Nature", editor: ["Magdalena Skipper"] }

const periodicals: Periodical[] = [nature]

const articles: Article[] = [
  {
    id: mkId(),
    title: "How 600-year-old ginkgo trees stay youthful",
    author: ["Proc. Natl Acad. Sci. USA"],
    publicationDate: new Date("2020-01-13"),
    periodicalID: nature.id
  },
  {
    id: mkId(),
    title:
      "The manicured wetland that sucks up more carbon than a natural marsh",
    author: ["J. Geophys. Res. Biogeo."],
    publicationDate: new Date("2020-01-16"),
    periodicalID: nature.id
  }
]
const books: Book[] = [
  {
    id: mkId(),
    title: "Gone with the Wind",
    author: ["Margaret Mitchell"],
    publicationDate: new Date("1936-06-30"),
    isbn: "9781447264552",
    genre: Genre.Fiction
  },
  {
    id: mkId(),
    title: "To Kill a Mockingbird",
    author: ["Harper Lee"],
    publicationDate: new Date("1960-07-11"),
    isbn: "9780446310789",
    genre: Genre.Fiction
  },
  {
    id: mkId(),
    title: "The Man Who Mistook His Wife for a Hat and Other Clinical Tales",
    author: ["Oliver Sacks"],
    publicationDate: new Date("1985-04-02"),
    isbn: "9781912128464",
    genre: Genre.Fiction
  }
]

const users: User[] = [
  { id: mkId(), name: "Ellen Gray" },
  { id: mkId(), name: "Aaron Barnhart" }
]

const reviews: Review[] = [
  {
    id: mkId(),
    userID: users[0].id,
    publicationID: books[0].id,
    score: 4,
    text: "Always a classic read."
  },
  {
    id: mkId(),
    userID: users[1].id,
    publicationID: articles[0].id,
    score: 5,
    text: "Fascinating!"
  }
]

export const isArticle = (input: Publication): input is Article => {
  return "periodicalID" in input
}

export const isBook = (input: Publication): input is Book => {
  return "isbn" in input
}

const must = <T>(input: T): NonNullable<T> => {
  if (input == null) {
    throw new Error("value not found")
  }
  return input!
}

// queries

export const allPeriodicals = (): Periodical[] =>
  orderBy(periodicals, ["title"], ["asc"])

export const allPublications = ({
  after,
  before,
  genre,
  limit
}: {
  after?: Date | null
  before?: Date | null
  genre?: Genre | null
  limit?: number | null
}): Publication[] => {
  const results = (articles as Publication[])
    .concat(books)
    .filter(pub => {
      if (after && pub.publicationDate < after) return false
      if (before && pub.publicationDate > before) return false
      if (genre && (!isBook(pub) || pub.genre !== genre)) return false
      return true
    })
    .slice(0, limit ?? undefined)
  return orderBy(results, ["publicationDate", "title"], ["desc", "asc"])
}

export const allUsers = (): User[] => orderBy(users, ["name"], ["asc"])

export const getArticlesByPeriodical = ({ id }: Periodical) =>
  orderBy(
    articles.filter(a => a.periodicalID === id),
    ["publicationDate", "title"],
    ["desc", "asc"]
  )

export const getPeriodical = (id: ID): Periodical =>
  must(periodicals.find(p => p.id === id))

export const getPublication = (id: ID): Publication =>
  must(articles.find(a => a.id === id) ?? books.find(b => b.id === id))

export const getUser = (id: ID): User => must(users.find(u => u.id === id))

export const getReviewsFor = (pub: Publication): Review[] =>
  reviews.filter(r => r.publicationID === pub.id)

export const getReviewsBy = (user: User): Review[] =>
  reviews.filter(r => r.userID === user.id)

// mutations

export const addArticle = (input: {
  title: string
  author: string[]
  publicationDate: Date
  periodicalID: ID
}): Article => {
  const periodical = getPeriodical(input.periodicalID)
  if (!periodical) {
    throw new Error("cannot add article, periodical not found")
  }
  const article = { ...input, id: mkId() }
  articles.push(article)
  return article
}

export const addBook = (input: Omit<Book, "id">): Book => {
  const book = { ...input, id: mkId() }
  books.push(book)
  return book
}

export const addPeriodical = (input: Omit<Periodical, "id">): Periodical => {
  const periodical = { ...input, id: mkId() }
  periodicals.push(periodical)
  return periodical
}

export const addUser = ({ name }: { name: string }): User => {
  const user = { id: mkId(), name }
  users.push(user)
  return user
}

export const addReview = (input: Omit<Review, "id">): Review => {
  const publication = getPublication(input.publicationID)
  const user = getUser(input.userID)
  if (!publication) {
    throw new Error("cannot add review, publication not found")
  }
  if (!user) {
    throw new Error("cannot add review, user not found")
  }
  const review = { ...input, id: mkId() }
  reviews.push(review)
  return review
}
