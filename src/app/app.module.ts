import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { HeaderComponent } from './header/header.component';
import { LibraryComponent } from './library/library.component';
import { PagerComponent } from './pager/pager.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { GoogleBooksService } from './google-books.service';
import { LibraryService } from './library.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    HeaderComponent,
    LibraryComponent,
    PagerComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GoogleBooksService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
