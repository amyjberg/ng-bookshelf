import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as actions from '../store/results/results.actions';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() private page = 1;
  @Input() private totalPages: number;
  @Input() private _store;

  constructor() { }

  // emits an event that the parent component listens for?
  @Output() private changePage: EventEmitter<number> = new EventEmitter<number>();

  next() {
    console.log('clicked next');
    this.changePage.emit(this.page + 1);
    // I want to dispatch a set page event? but then this component needs access to the store :(
  }

  prev() {
    this.changePage.emit(this.page - 1);
    console.log('clicked prev');
    // I want to dispatch a set page event?
  }

  ngOnInit() {
  }

}
