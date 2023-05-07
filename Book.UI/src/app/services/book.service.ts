import { Injectable } from '@angular/core';
import { Book } from '../models/book'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = "book";

  constructor(private http: HttpClient  ) { }

  public getBooks() : Observable <Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}`);
  }
}
