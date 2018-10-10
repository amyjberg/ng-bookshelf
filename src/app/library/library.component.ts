import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service'


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  books: Book[] = [];

  constructor(private libraryService: LibraryService) {
    this.books = libraryService.books;
  }

  ngOnInit() {
  }

}
