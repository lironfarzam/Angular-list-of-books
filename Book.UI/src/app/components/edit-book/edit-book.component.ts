import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {

  @Input() book?: Book;
  @Output() bookCreated = new EventEmitter<Book>();
  @Output() bookUpdated = new EventEmitter<Book>();
  @Output() bookDeleted = new EventEmitter<Book>();
  @Output() books: Book[] = [];

  
  private baseUrl: string = "book";
  newBook: Book = new Book();
  selectedGenre: string = "";
  deleteId: number = -1;

  //validation
  b_errorMsgTitle = false;
  errorMsgTitle = "";

  b_errorMsgAuthor = false;
  errorMsgAuthor = "";

  b_errorMsgPrice = false;
  errorMsgPrice = "";

  b_errorMsgGenre = false;
  errorMsgGenre = "";

  b_errorMsgPublishedDate = false;
  errorMsgPublishedDate = "";

  b_errorMsgId = false;
  errorMsgId = "";
  

  // genres: string[] = [ ];


  constructor(private http: HttpClient) {}

  createBook(book: Book) {
    console.log("Create:", book);

    let v1 = this.validateTitle(book.title);
    let v2 = this.validateAuthor(book.author);
    let v3 = this.validatePrice(book.price);
    let v4 = this.validateGenre(this.selectedGenre);
    let v5 = this.validatePublishedDate(book.publishedDate);

    if (v1 && v2 && v3 && v4 && v5) {
    let url = `${environment.apiUrl}/${this.baseUrl}`;
    book.genre = this.selectedGenre;
    this.http.post(url, book).subscribe((result: any) => {
      // console.log(result);
      this.bookCreated.emit(book);
      this.books = result;
      //reset form
      this.resetFormAndValidation();
    });
  }
  }

  resetFormAndValidation() {
    this.newBook = new Book();
    this.selectedGenre = "";
    this.b_errorMsgTitle = false;
    this.errorMsgTitle = "";
    this.b_errorMsgAuthor = false;
    this.errorMsgAuthor = "";
    this.b_errorMsgPrice = false;
    this.errorMsgPrice = "";
    this.b_errorMsgGenre = false;
    this.errorMsgGenre = "";
    this.b_errorMsgPublishedDate = false;
    this.errorMsgPublishedDate = "";
  }
  
  deleteBook(book: Book) {
    console.log("Delete:", book);
    
    let url = `${environment.apiUrl}/${this.baseUrl}/${book.id}`;
    this.http.delete(url).subscribe((result: any) => {
      // console.log(result);
      this.bookDeleted.emit(book);
      this.books = result;
    });
  }

  updateBook(book: Book) {
    console.log("Update:", book);
    let url = `${environment.apiUrl}/${this.baseUrl}/${book.id}`;
    this.http.put(url, book).subscribe((result: any) => {
      // console.log(result);
      this.bookUpdated.emit(book); // emit the event when the book is updated
      this.books = result;
    });
  }


  deleteBookById(idToDelete: number) {
    // Find the index of the book with the given ID
    console.log("Delete:", idToDelete);
  
    
   

    this.getBookById(idToDelete).pipe(
      switchMap(() => {
        // console.log("Book found!!!!");
        let url = `${environment.apiUrl}/${this.baseUrl}/${idToDelete}`;
        this.b_errorMsgId = false;
        this.errorMsgId = "";
        return this.http.delete(url);
      })
    ).subscribe((result: any) => {
      // console.log(result);
      this.books = result;
    }, error => {
      // console.log("Book not found!!!!");
      this.b_errorMsgId = true;
      this.errorMsgId = "Id must be a number in the table";
    });
    
  }

  getBookById(id: number): Observable<any> {
    console.log("Get:", id);
    let url = `${environment.apiUrl}/${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  validateTitle(title: string) {
    if (title.length < 3) {
      this.b_errorMsgTitle = true;
      this.errorMsgTitle = "Title must be at least 3 characters long";
      return false;
    } else {
      this.b_errorMsgTitle = false;
      this.errorMsgTitle = "";
      return true;
    }
  }

  validateAuthor(author: string) {
    if (author.length < 3) {
      this.b_errorMsgAuthor = true;
      this.errorMsgAuthor = "Author must be at least 3 characters long";
      return false;
    } else {
      this.b_errorMsgAuthor = false;
      this.errorMsgAuthor = "";
      return true;
    }
  }

  validatePrice(price: number) {
    if (price < 0) {
      this.b_errorMsgPrice = true;
      this.errorMsgPrice = "Price must be greater than 0";
      return false;
    } else {
      this.b_errorMsgPrice = false;
      this.errorMsgPrice = "";
      return true;
    }
  }

  validateGenre(genre: string) {
    
    if (genre == "") {
      this.b_errorMsgGenre = true;
      this.errorMsgGenre = "Genre must be selected";
      return false;
    } else {
      this.b_errorMsgGenre = false;
      this.errorMsgGenre = "";
      return true;
    }
  }

  validatePublishedDate(publishedDate: Date) {

    console.log(publishedDate);
    if (publishedDate == null || publishedDate == undefined || publishedDate.toString() == "") {
      //add if to string format not in dd/mm/yyyy format 


      this.b_errorMsgPublishedDate = true;
      this.errorMsgPublishedDate = "Published Date must be selected";
      return false;
    } else {
      this.b_errorMsgPublishedDate = false;
      this.errorMsgPublishedDate = "";
      return true;
    }
  }





  ngOnInit(): void {}
}
