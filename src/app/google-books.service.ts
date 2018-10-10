import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './shared/book';
import key from '../../secrets';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialized: boolean = false;
  public totalItems: number = 1;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string="";
  public books: Book[];
  public newBook: Book;

  constructor(private http: Http) { }

  get startIndex() {
    return this.page * this.pageSize
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize)
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    console.log('trying to reset page value with', val)
    if (val !== this.page && val >= 1) {
      this._page = val;
      this.searchBooks(this.query)
      console.log('I think we did it!');
    }
  }

  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialized = true;
    this.books = [];
    this.http.get(`${this.API_PATH}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}&key=${key}`)
      .pipe(
        map(res => res.json()),
        tap(data => {
          this.totalItems = data.totalItems;
        }),
        map(data => data.items ? data.items : []),
        map(items => items.map(item => this.bookFactory(item))),
        tap(_ => this.loading = false)
      )
      .subscribe((books) => {
        this.books = books;
      });
  }

  retrieveBook(bookId: string) {
    return this.http
    .get(`${this.API_PATH}/${bookId}`)
    .pipe(
      map(res => res.json()),
      map(item => this.bookFactory(item))
    )
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
      null, //item.volumeInfo.imageLinks.thumbnail
      // item.volumeInfo.imageLinks.smallThumbnail
      null
    )
  }

}

