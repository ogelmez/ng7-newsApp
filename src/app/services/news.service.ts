import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { News } from '../models/news';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, finalize } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class NewsService {
  pathNews = "https://dev.matrikswebtrader.com/homework/assets/dummy-service/default.asp?type=newsHeader&page"
  pathDetail="https://dev.matrikswebtrader.com/homework/assets/dummy-service/newsDetail.asp?id="
  
  constructor(
    private http: HttpClient,
    ) { }

  getNews(selected:string): Observable<News[]> { 
      return this.http.get<News[]>(this.pathNews)
      .pipe(map((data) => {
          const selectedData =data.filter(function(data){
            if(!selected){
              return data
            }
            else{
                return data.category == selected
              }
          });
          return selectedData;
      })
    ,catchError(this.handleError))
  }
  getNewsDetail(newsId:string): Observable<News[]> { 
    return this.http.get<News[]>(this.pathDetail+newsId)
    .pipe(tap(data =>
       JSON.stringify(data))
        , catchError(this.handleError))
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
