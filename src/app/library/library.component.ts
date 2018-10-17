import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLibraryBooks } from '../store/library/library.selectors';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  books: Book[] = [];

  test = 'hi';

  constructor(private _store: Store<any>) {
    this._store.select(getLibraryBooks).subscribe(books => this.books = books);
  }

  ngOnInit() {
  }

}
