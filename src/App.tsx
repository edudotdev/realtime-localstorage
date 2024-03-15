import { useEffect, useState } from 'react'
import { Library } from  './types'
import Books from './assets/books.json'
import './App.css'

function App() {
  const [books, setBooks] = useState<Library[]>()

  const checkLocalStorage = () => {
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(Books.library));
    }
  
    setBooks(JSON.parse(localStorage.getItem('books') || "[]"));
  };
  
  const handleDelete = (id: string) => {
    const newBooks = books?.filter(({ book }) => book.ISBN !== id);
    setBooks(newBooks)
  
    localStorage.setItem("books", JSON.stringify(newBooks));
  }
  
  useEffect(() => {
    const storageEventListener = (event: StorageEvent) => {
      if (event.key === "books") {
        setBooks(JSON.parse(event.newValue || "[]"));
      }
    };
  
    window.addEventListener("storage", storageEventListener);
  
    return () => {
      window.removeEventListener("storage", storageEventListener);
    };
  }, [books]);
  
  useEffect(() => {
    checkLocalStorage();
  }, []);
  

  return (
    <>
      <h2>Delete some book</h2>
      {books?.map(({book}) => (
        <button key={book.ISBN} onClick={() => handleDelete(book.ISBN)}>{book.title}</button>
      ))}
    </>
)}

export default App
