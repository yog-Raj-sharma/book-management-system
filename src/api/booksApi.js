import axios from 'axios'

// One configured axios instance for the whole app. The base URL comes from
// an environment variable (set in .env locally, and in your Vercel/Netlify
// dashboard for production) so no URLs are hard-coded into components.
//
// For your MockAPI project the base URL is:
//   https://6a1477b26c7db8aac054972c.mockapi.io
// and the books resource lives at  <base>/books
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// A "book" resource looks like:
//   { id: string, title: string, author: string, genre: string, year: number }
// MockAPI assigns the `id` automatically on create.

// GET /books — fetch the full list
export const getBooks = async () => {
  const { data } = await api.get('/books')
  return data
}

// POST /books — create a new book
export const createBook = async (book) => {
  const { data } = await api.post('/books', book)
  return data
}

// PUT /books/:id — replace an existing book
export const updateBook = async (id, book) => {
  const { data } = await api.put(`/books/${id}`, book)
  return data
}

// DELETE /books/:id — remove a book
export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/${id}`)
  return data
}