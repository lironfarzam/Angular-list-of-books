import { Observer } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './services/book.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  public activeClass: boolean = false;
  title = 'Book.UI';
  books: Book[] = [];
  bookToEdit?: Book;
  result: Partial<Observer<Book[]>>|((value: Book[]) => void)|undefined;

  constructor(
    private bookService: BookService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookService
      .getBooks()
      .subscribe((result: Book[]) => (this.books = result));
  }

  onBookUpdated(book: Book) {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.books[index] = book;
    }
  }

  updateBook(book: Book) {
    this.bookToEdit = book;
  }

  editMod() {
    this.activeClass = !this.activeClass;
    
  }

  onBookCreated(book: Book) {
    this.cdRef.detectChanges();
    // update the table to pull in the new book
    // this.books.push(book);
    // this.initNewBook();
    this.ngOnInit();
  }

  onBookDeleted($event: Book) {
    this.cdRef.detectChanges();
    // update the table to remove the deleted book
    // this.books = this.books.filter(book => book.id !== $event.id);
    // this.initNewBook();
    this.ngOnInit();
    
    }
}
