import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent {

  private baseUrl: string = "book";
  

  @Input() books: Book[] = [];
  @Output() bookUpdated = new EventEmitter<Book>();
  


  constructor(private http: HttpClient  ) { }

  editBook(book: Book) {
  throw new Error('Method not implemented.');
  }

  deleteBook(book: Book) {
    console.log("Delete:", book);
    let url = `${environment.apiUrl}/${this.baseUrl}/${book.id}`;
    this.http.delete(url).subscribe((result: any) => {
        this.bookUpdated.emit(book); // emit the event when the book is deleted
        this.books = result;
    });
  }
}

