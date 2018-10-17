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
  value = 'hello';
  @Input() books: Book[];
  onChange = (a) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
    console.log('CHILD INIT with value:', this.value);
  }

  writeValue(value) {
    console.log('---> writing value:', value, '<---');
    this.value = value;
    // initially sets value to null
    // after registering, it gets the value of the ngModel test from parent component
    // 'This method is called by the forms API to write to the view
    // when programmatic changes from model to view are requested'
  }

  registerOnChange(fn) {
    console.log('REGISTERING: onChange');
    this.onChange = function(a) {
      console.log('calling onChange with', a);
      return fn(a);
    };
  }

  registerOnTouched(fn) {
    console.log('REGISTERING: onTouched');
    this.onTouched = function() {
      console.log('calling onTouched, value now', this.value);
      return fn();
    };
  }

  changed(event) {
    console.log('==*== inside changed(e) ==*==');
    this.onChange(event.target.value);
    this.onTouched();
  }
}
