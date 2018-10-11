import { Injectable } from '@angular/core';
import { Book } from './shared/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  books: Book[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  private load() {
    let savedBooks = localStorage.getItem('books');
    if (!savedBooks) {
      return;
    }
    savedBooks = JSON.parse(savedBooks);

    for (let i = 0; i < savedBooks.length; i++) {
      const savedBook = savedBooks[i];
      this.books.push(Object.assign(new Book(null, null, null, null, null, null, null, null, null, null), savedBook))
    }
  }

  addBook(book: Book) {
    if (!this.hasBook(book)) {
      this.books.push(book);
      this.save();
    }
  }

  removeBook(book: Book) {
    const index = this.findIndex(book);
    this.books.splice(index, 1);
    this.save();
  }

  hasBook(book: Book): boolean {
    return this.findIndex(book) !== -1;
  }

  findIndex(book: Book): number {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === book.id) {
        return i;
      }
    }
    return -1;
  }
}
