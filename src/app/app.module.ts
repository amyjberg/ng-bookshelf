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

import { StoreModule } from '@ngrx/store';
import { appReducers, appEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { LibrarySearchComponent } from './library-search/library-search.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    HeaderComponent,
    LibraryComponent,
    PagerComponent,
    SearchComponent,
    LibrarySearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ library: appReducers.library, results: appReducers.results }),
    EffectsModule.forRoot(appEffects)
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
