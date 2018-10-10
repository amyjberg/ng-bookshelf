import { BookComponent } from './book/book.component';
import { LibraryComponent } from './library/library.component';
import { SearchComponent } from './search/search.component';
import {Routes} from "@angular/router";

export const routes: Routes = [
  //TODO: Define the routes
  { path: 'search', component: SearchComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'book/:id', component: BookComponent }
];
