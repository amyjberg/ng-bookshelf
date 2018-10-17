import { Component, forwardRef, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Book } from './../shared/book';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-library-search',
  // template: `<div #location></div>`,
  templateUrl: './library-search.component.html',
  // styleUrls: ['./library-search.component.css'],
  styles: ['div {width: 100px}'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LibrarySearchComponent),
    multi: true
  }]
})
export class LibrarySearchComponent implements OnInit, ControlValueAccessor {
  value = '';
  @Input() books: Book[];
  onChange = (a) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) {
    console.log('writing value!', value);
    if (value !== 'bob') {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    console.log('registering on change fn!!');
    this.onChange = function(a) {
      console.log('calling onChange');
      return fn(a);
    };
  }

  registerOnTouched(fn) {
    console.log('registering on touched fn!!');
    this.onTouched = function() {
      console.log('calling onTouched');
      return fn();
    };
  }

  changed(event) {
    console.log('==*== inside changed ==*==');
    this.onChange(event.target.value);
    this.onTouched();
  }
}
