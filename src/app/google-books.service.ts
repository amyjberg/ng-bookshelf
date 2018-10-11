import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Book } from './shared/book';
import key from '../../secrets';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  public newBook: Book;

  constructor(private http: Http) { }

  public searchBooks(queryTitle: string, pageSize: number, startIndex: number) {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}&maxResults=${pageSize}&startIndex=${startIndex}&key=${key}`)
      .pipe(
        map(res => res.json()),
        map(data => data.items ? data.items : []),
        map(items => items.map(item => this.bookFactory(item))),
        // catchError(err => {
        //   console.log('uh oh, error!', err.message);
        //   return of(err);
        // })
      );
  }

  retrieveBook(bookId: string) {
    return this.http
    .get(`${this.API_PATH}/${bookId}`)
    .pipe(
      map(res => res.json()),
      map(item => this.bookFactory(item))
    );
  }

  private bookFactory(item: any): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories ? item.volumeInfo.categories.map((item) => item.split("/").pop().trim()) : ['N/A'],
      null,
      null
    );
  }

}

