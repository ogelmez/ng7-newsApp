import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/categories';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  pathFile = "https://dev.matrikswebtrader.com/homework/assets/dummy-service/default.asp?type=newsCategory"
  constructor(private http: HttpClient) { }


  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.pathFile)
      .pipe(map((data) => {
        data.sort((a, b) => {
          const dataSort = a.description < b.description ? -1 : 1;
          return dataSort;
        });
        return data;
      }), catchError(this.handleError))
  }
 

  handleError(err: HttpErrorResponse) {
    let errorMessage = ""
    if (err.error instanceof ErrorEvent) {
      errorMessage = "Error!" + err.error.message
    }
    else {
      errorMessage = "System Error!"
    }
    return throwError(errorMessage)
  }
}
