import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as actions from '../store/results/results.actions';
import { Book } from '../shared/book';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() private page = 1;
  @Input() private totalPages: number;
  @Input() private books: Book[];

  constructor() { }

  // emits an event that the parent component listens for?
  @Output() private changePage: EventEmitter<number> = new EventEmitter<number>();

  next() {
    console.log('clicked next');
    this.changePage.emit(this.page + 1);
  }

  prev() {
    this.changePage.emit(this.page - 1);
    console.log('clicked prev');
  }

  ngOnInit() {
  }

}
