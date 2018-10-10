import { Book } from './../shared/book';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[];

  constructor() { }

  ngOnInit() {
  }

}
