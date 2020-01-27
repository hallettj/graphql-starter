export type ID = string

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
  genre?: string
}

const articles: Article[] = []
const books: Book[] = []

const database = {
  articles,
  books
}

export default database
